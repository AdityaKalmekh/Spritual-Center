"use client";

import { jwtDecode } from "jwt-decode";
import { useParams } from "next/navigation.js";
import { useEffect, useRef, useState } from "react";
import ChatMessage from "../../../../components/ChatMessage.tsx";
import Cookies from "js-cookie";
import { socket } from "../../../../socket.js";
import { messageHandler } from "../../../actions.ts";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../../../../../lib/features/userslice.tsx";

const ChatBoard = () => {
  const msgRef = useRef();
  const dispatch = useDispatch();
  const [user, setUser] = useState<string>("");
  const [chatState, setChatState] = useState<any>([]);
  const [roomName, setRoomName] = useState<string>("");
  const { room } = useParams();
  // const messages = useSelector((state:any) => state.devotee.messages);

  const fetchChat = async (room: string) => {
    const response = await fetch(`/api/message/${room}`, {
      method: "GET",
    });
    const resolveResponse = await response.json();
    // dispatch(userAction.setMessages(resolveResponse))
    setChatState(resolveResponse);
  };

  useEffect(() => {
    const Token = Cookies.get("Token");
    const { role, DevoteeId }: any = jwtDecode(Token);
    console.log(role);
    console.log(DevoteeId);
    if (room !== "community") {
      if (role === "Admin") {
        const roomName = `${role}@${room}`;
        const arrRoomName = roomName.split("@");
        const sortStr = arrRoomName.sort((a, b) =>
          a < b ? -1 : a > b ? 1 : 0
        );
        const covStr = sortStr[0] + sortStr[1];
        socket.emit("joinroom", covStr);
        fetchChat(covStr);
        setRoomName(covStr);
      } else {
        const roomName = `${DevoteeId}@${room}`;
        const arrRoomName = roomName.split("@");
        const sortStr = arrRoomName.sort((a, b) =>
          a < b ? -1 : a > b ? 1 : 0
        );
        const covStr = sortStr[0] + sortStr[1];
        socket.emit("joinroom", covStr);
        fetchChat(covStr);
        setRoomName(covStr);
      }
    } else {
      socket.emit("joinroom", room);
      fetchChat(room);
      setRoomName(room);
    }
    role ? setUser(role) : setUser(DevoteeId);
  }, [room]);

  useEffect(() => {
    socket.on("messages", (data: any) => {
      setChatState((prev: any) => [...prev, data]);
    });

    return () => {
      socket.off("messages");
    };
  }, [socket]);

  const communityMsg = async () => {
    const data = {
      Content: msgRef.current.value,
      Room: roomName,
    };

    const response = await fetch("/api/message/addMessage", {
      method: "POST",
      body: JSON.stringify(data),
    });
    const resolveResponse = await response.json();
    socket.emit("chatMessage", resolveResponse);
    msgRef.current.value = "";
  };

  return (
    <>
      <div style={{height:"70vh", overflowY:"auto"}}>
        {chatState?.map((message: any) => (
          <ChatMessage user={user} message={message} />
        ))}
      </div>
      <div className="mt-3 container">
        <div
          className="d-flex justity-content-center"
        >
          <input
            type="text"
            className="form-control border border-dark w-100"
            placeholder="Enter a message"
            ref={msgRef}
          />
          <input type="text" hidden value={room} />
          <button onClick={() => communityMsg()} className="btn">
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatBoard;
