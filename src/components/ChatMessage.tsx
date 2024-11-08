"use client";

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
        "inline-block p-3 text-sm rounded-lg",
        "max-w-[75%] break-words",
        isUserMessage
          ? "self-start bg-[#2d55fb] text-white shadow-md"
          : "self-end bg-gray-400 text-gray-800"
      )}
    >
      {message.content}
    </div>
  );
};

export default ChatMessage;
