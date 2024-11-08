"use client";

import Image from "next/image";
import dynamic from "next/dynamic";

import backgroundImage from "../../public/background.jpg";
import { useSocket } from "@/context/SocketProvider";
import { ScrollArea } from "./ui/scroll-area";

const ChatMessage = dynamic(() => import("@/components/ChatMessage"));

const ChatScreen = () => {
  const { messages } = useSocket();

  console.log(messages);

  return (
    <div className="relative flex-grow w-full max-w-xl rounded-lg border border-gray-200 shadow-md">
      <Image
        src={backgroundImage}
        alt="Chat background"
        layout="fill"
        objectFit="cover"
        className="z-0"
      />

      <ScrollArea className="relative flex-grow w-full px-6 py-3">
        <div className="w-full flex flex-col gap-4">
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ChatScreen;
