import React, { useEffect, useState } from "react";
// import { over } from "stompjs";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

var client = null;

const ChatRoom = () => {
  const [userData, setUserData] = useState({
    nickName: "",
    fullName: "",
    status: false,
  });

  useEffect(() => {
    console.log(userData);
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

  const onConnected = () => {
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
    console.log("publish message");
    // document.querySelector("#connected-user-fullname").textContent = fullname;
    findAndDisplayConnectedUsers().then();
  };

  async function findAndDisplayConnectedUsers() {
    // fetch from @GetMapping("/users") in UserController
    const connectedUsersResponse = await fetch("/users");
    let connectedUsers = await connectedUsersResponse.json();
    console.log(connectedUsers);

    // you can also filter in the back-end
    connectedUsers = connectedUsers.filter(
      (user) => user.nickName !== nickname
    );
    const connectedUsersList = document.getElementById("connectedUsers");
    connectedUsersList.innerHTML = "";

    connectedUsers.forEach((user) => {
      appendUserElement(user, connectedUsersList);
      if (connectedUsers.indexOf(user) < connectedUsers.length - 1) {
        const separator = document.createElement("li");
        separator.classList.add("separator");
        connectedUsersList.appendChild(separator);
      }
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
        <div className="chat-box">
          <p>chat box</p>
          <button onClick={onLogout}>Log out</button>
        </div>
      ) : (
        <div className="register">
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
