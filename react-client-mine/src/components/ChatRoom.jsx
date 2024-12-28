import React, { useEffect, useState } from "react";
// import { over } from "stompjs";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

var client = null;

const ChatRoom = () => {
  const [userData, setUserData] = useState({
    username: "",
    receivername: "",
    connected: false,
    message: "",
  });

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  const connect = () => {
    // console.log("thuc hien connect");
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
  };

  const onConnected = () => {
    console.log("conntected anhao");
    setUserData({ ...userData, connected: true });
    // stompClient.subscribe("/chatroom/public", onMessageReceived);
    // stompClient.subscribe(
    //   "/user/" + userData.username + "/private",
    //   onPrivateMessage
    // );

    // Save or update user into the DB
    var chatMessage = {
      nickName: userData.username,
      status: "OFFLINE",
    };

    // client.send("/app/message", {}, JSON.stringify(chatMessage));
    client.publish({
      destination: "/app/message",
      body: JSON.stringify(chatMessage),
    });
  };

  const handleUsername = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, username: value });
  };

  const registerUser = () => {
    connect();
  };

  return (
    <div className="container">
      {userData.connected ? (
        <div className="chat-box">
          <p>chat box</p>
        </div>
      ) : (
        <div className="register">
          <input
            id="user-name"
            placeholder="Enter your name anhao"
            name="userName"
            value={userData.username}
            onChange={handleUsername}
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
