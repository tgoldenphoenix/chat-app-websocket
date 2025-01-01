import React, { useEffect, useState } from "react";
import axios from "axios";
// import { over } from "stompjs";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { getAllOnlineUsers } from "../service/UserService";

var client = null;
const API_URL = "http://localhost:8080/api/user/";
const API_URL_CHAT = "http://localhost:8080/api/chat/";

const ChatRoom = () => {
  const [userData, setUserData] = useState({
    nickName: "",
    fullName: "",
    status: false,
  });
  const [connectedUsers, setConnectedUsers] = useState([{}]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [userChatResponse, setUserChatResponse] = useState([{}]);
  const [messageToSend, setMessageToSend] = useState({
    senderId: userData.nickName,
    recipientId: "admin01",
    content: "",
    timestamp: new Date(),
  });

  useEffect(() => {
    // console.log("current user info:");
    // console.log(userData);

    // update senderId for messageToSend
    if (userData.nickName) {
      setMessageToSend((prev) => ({
        ...prev,
        senderId: userData.nickName,
      }));
    }

    // console.log("list of online users");
    // findAndDisplayConnectedUsers();
    // console.log(connectedUsers);

    // console.log(messageToSend);
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
    // /user & /chatroom là 2 cái .enableSimpleBroker()
    client.subscribe(
      `/user/${userData.username}/queue/messages`,
      onMessageReceived
    );
    client.subscribe(`/user/public`, onMessageReceived);

    // update user status to ONLINE
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
    console.log("client try to find online user (filtered)");
    findAndDisplayConnectedUsers().then();
    // setLoading(true);
  };

  const onMessageReceived = async (payload) => {
    await findAndDisplayConnectedUsers();

    // !!!IMPORTANT
    console.log("Message received", payload);
    const message = JSON.parse(payload.body);
    // if (selectedUserId && selectedUserId === message.senderId) {
    //   displayMessage(message.senderId, message.content);
    //   chatArea.scrollTop = chatArea.scrollHeight;
    // }

    // if (selectedUserId) {
    //   document.querySelector(`#${selectedUserId}`).classList.add("active");
    // } else {
    //   messageForm.classList.add("hidden");
    // }

    // const notifiedUser = document.querySelector(`#${message.senderId}`);
    // if (notifiedUser && !notifiedUser.classList.contains("active")) {
    //   const nbrMsg = notifiedUser.querySelector(".nbr-msg");
    //   nbrMsg.classList.remove("hidden");
    //   nbrMsg.textContent = "";
    // }
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

  const handleChangeMessage = (event) => {
    const { name, value } = event.target;
    // setMessageToSend(value);
    setMessageToSend((prevFormData) => ({ ...prevFormData, content: value }));
  };

  const sendMessage = (event) => {
    event.preventDefault();
    // alert(`You searched for '${messageToSend.content}'`);
    // console.log(messageToSend);

    console.log("sending message to ws server");
    if (messageToSend.content && client) {
      client.publish({
        destination: "/app/chat",
        body: JSON.stringify(messageToSend),
      });

      // client.publish({
      //   destination: "/app/user.addUser",
      //   body: JSON.stringify({
      //     nickName: userData.nickName,
      //     fullName: userData.fullName,
      //     status: "ONLINE",
      //   }),
      // });
    }
  };

  const userItemClick = (nickname) => {
    // console.log("selected user", nickname);
    setSelectedUserId(nickname);
    fetchAndDisplayUserChat();
  };

  const fetchAndDisplayUserChat = async () => {
    //TODO
    // const userChatResponse = await fetch(
    //   `/messages/${nickname}/${selectedUserId}`
    // );
    // const userChat = await userChatResponse.json();
    // chatArea.innerHTML = "";
    // userChat.forEach((chat) => {
    //   displayMessage(chat.senderId, chat.content);
    // });
    // chatArea.scrollTop = chatArea.scrollHeight;

    await axios
      .get(API_URL_CHAT + `messages/${userData.nickName}/${selectedUserId}`)
      .then((response) => {
        console.log("all messages: ", response.data);
        // setConnectedUsers(connectedUsersFilter);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      {userData.connected ? (
        <div className="">
          <h2>Online user</h2>
          {connectedUsers ? (
            connectedUsers.map(function (data) {
              return (
                <p onClick={() => userItemClick(data.nickName)}>
                  User name: {data.nickName}
                </p>
              );
            })
          ) : (
            <p>no other user yet</p>
          )}
          <h3>Chat messages</h3>
          <ul></ul>

          <h3>Send message</h3>
          <form onSubmit={sendMessage}>
            <input
              type="text"
              value={messageToSend.content}
              onChange={handleChangeMessage}
              placeholder="Type your message..."
            />
            <button type="submit">Send</button>
          </form>
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
