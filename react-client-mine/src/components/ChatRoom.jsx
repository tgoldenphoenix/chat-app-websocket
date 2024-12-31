import React, { useEffect, useState } from "react";
import axios from "axios";
// import { over } from "stompjs";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { getAllOnlineUsers } from "../service/UserService";

var client = null;
const API_URL = "http://localhost:8080/api/user/";

const ChatRoom = () => {
  const [userData, setUserData] = useState({
    nickName: "",
    fullName: "",
    status: false,
  });
  const [connectedUsers, setConnectedUsers] = useState({});
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("current user info:");
    console.log(userData);

    findAndDisplayConnectedUsers();
    console.log("list of online users");
    console.log(connectedUsers);
  }, [userData]);

  const connect = () => {
    // console.log("attempt connect stomp client");
    client = new Client({
      brokerURL: "ws://localhost:8080/ws",
      onConnect: onConnected,
      onWebSocketError: () => {
        console.log("Error with the websocket");
      },
      onStompError: () => {
        console.log("Stomp error");
      },
      onDisconnect: () => {
        console.log("Disconnected");
      },
    });

    client.activate();
    // client.deactivate();
  };

  const onConnected = async () => {
    console.log("stomp client connect successfully!");
    setUserData({ ...userData, connected: true });

    // Subscribe client to URLs
    // client.subscribe(
    //   `/user/${userData.username}/queue/messages`,
    //   onMessageReceived
    // );
    // client.subscribe(`/user/public`, onMessageReceived);

    // client.subscribe("/chatroom/public", onMessageReceived);
    // stompClient.subscribe(
    //   "/user/" + userData.username + "/private",
    //   onPrivateMessage
    // );

    client.publish({
      destination: "/app/user.addUser",
      body: JSON.stringify({
        nickName: userData.nickName,
        fullName: userData.fullName,
        status: "ONLINE",
      }),
    });
    console.log("add/update user status into DB");

    // document.querySelector("#connected-user-fullname").textContent = fullname;
    // console.log("client try to find online user (filtered)");
    // findAndDisplayConnectedUsers().then();
    // setLoading(true);
  };

  async function findAndDisplayConnectedUsers() {
    // import from UserService
    await axios
      .get(API_URL + "users")
      .then((response) => {
        // filter out current user
        let connectedUsersFilter = response.data.filter(
          (user) => user.nickName !== userData.nickName
        );
        setConnectedUsers(connectedUsersFilter);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleUsername = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, nickName: value });
  };

  const registerUser = () => {
    connect();
  };

  const onLogout = () => {
    // client.publish("/app/user.disconnectUser",
    //     {},
    //     JSON.stringify({nickName: nickname, fullName: fullname, status: 'OFFLINE'})
    // );

    client.publish({
      destination: "/app/user.disconnectUser",
      body: JSON.stringify({
        nickName: userData.nickName,
        fullName: userData.fullName,
        status: "OFFLINE",
      }),
    });
    client.deactivate();
    console.log("de-activate stomp client & change user status to OFFLINE");

    // window.location.reload();
  };

  return (
    <div className="container">
      {userData.connected ? (
        <div className="">
          <h2>Online user</h2>
          {connectedUsers.map(function (data) {
            return <p>User name: {data.nickName}</p>;
          })}
          <button onClick={onLogout}>Log out</button>
        </div>
      ) : (
        <div className="">
          <input
            id="user-name"
            placeholder="Enter nick name"
            name="userName"
            value={userData.nickName}
            onChange={handleUsername}
            margin="normal"
          />
          <input
            placeholder="Enter full name"
            value={userData.fullName}
            onChange={(e) =>
              setUserData({ ...userData, fullName: e.target.value })
            }
            margin="normal"
          />
          <button type="button" onClick={registerUser}>
            connect
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatRoom;
