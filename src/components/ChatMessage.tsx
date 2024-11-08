"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Message } from "@/types";

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUserMessage = message.userId !== "server";

  return (
    <div
      className={cn(
        "max-w-xs p-2 text-sm rounded-lg",
        isUserMessage
          ? "self-end bg-zinc-500 text-white"
          : "self-start bg-gray-200 text-gray-800"
      )}
    >
      {message.content}
    </div>
  );
};

export default ChatMessage;
