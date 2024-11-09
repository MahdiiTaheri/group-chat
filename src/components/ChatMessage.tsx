"use client";

import { springMotionProps } from "@/lib/motions";
import { cn } from "@/lib/utils";
import { Message } from "@/types";
import { motion } from "framer-motion";

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUserMessage = message.userId !== "server";

  return (
    <motion.div
      className={cn(
        "inline-block p-3 text-md rounded-lg font-semibold",
        "max-w-[75%] break-words",
        isUserMessage
          ? "self-start bg-gradient-to-tr from-chat-message-1 to-chat-message-2 text-white shadow-md"
          : "self-end bg-gradient-to-tr from-server-message-1 to-server-message-2 text-white"
      )}
      {...springMotionProps}
    >
      {message.content}
    </motion.div>
  );
};

export default ChatMessage;
