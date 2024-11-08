"use client";

import React from "react";
import { useSocket } from "@/context/SocketProvider";
import ChatMessage from "@/components/ChatMessage";
import { ScrollArea } from "@/components/ui/scroll-area";

const ChatScreen = () => {
  const { messages } = useSocket();

  return (
    <ScrollArea className="flex-grow w-full max-w-xl rounded-lg border border-gray-800 bg-[#f7f9fc] p-4 shadow-md">
      <div className="space-y-4">
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
      </div>
    </ScrollArea>
  );
};

export default ChatScreen;
