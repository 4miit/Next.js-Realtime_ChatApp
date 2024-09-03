"use client";

import React, { useState } from "react";
import { useSocket } from "../context/SocketProvider";
import cl from "./page.module.css";

export default function Page() {
  const { sendMessage } = useSocket();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]); 

  const handleSendMessage = () => {
    sendMessage(message);
    setMessages([...messages, message]); 
    setMessage('');  
  };

  

  return (
    <div>
      
        <input
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your Message"
        className={cl["chat-input"]}
        />
        <button onClick={handleSendMessage} className={cl["button"]}>
          send
        </button>
          
        
        <li>
          {messages.map((e,index) => {
            return <h1 key={index}>{e}</h1>;
          })}
        </li>
        
        
     
    </div>
  );
}
