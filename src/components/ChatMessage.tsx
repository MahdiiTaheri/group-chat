"use client";

import { useSocket } from "@/context/SocketProvider";
import { springMotionProps } from "@/lib/motions";
import { cn } from "@/lib/utils";
import { Message } from "@/types";
import { motion } from "framer-motion";
import { Trash2, X } from "lucide-react";
import { toast } from "sonner";

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const { deleteMessage } = useSocket();
  const isUserMessage = message.userId !== "server";

  return (
    <motion.div
      className={cn(
        "relative inline-block p-3 text-md rounded-lg font-semibold group",
        "max-w-[75%] break-words",
        isUserMessage
          ? "self-start bg-gradient-to-tr from-chat-message-1 to-chat-message-2 text-white shadow-md"
          : "self-end bg-gradient-to-tr from-server-message-1 to-server-message-2 text-white"
      )}
      {...springMotionProps}
    >
      {message.content}

      <div
        className="absolute bg-zinc-200 w-10 h-10 rounded-full flex items-center justify-center top-1/2 right-[-60px] transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 hover:bg-red-100 cursor-pointer"
        onClick={() => {
          deleteMessage(message.id!);
          toast("Message deleted successfully", {
            cancel: { label: <X className="w-5 h-5" />, onClick: () => {} },
          });
        }}
      >
        <Trash2 className="w-5 h-5 text-red-700" />
      </div>
    </motion.div>
  );
};

export default ChatMessage;
