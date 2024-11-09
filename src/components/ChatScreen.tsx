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
    <ScrollArea className="relative flex-grow w-full max-w-md md:max-w-2xl lg:max-w-3xl rounded-lg border border-gray-200 shadow-md px-6 py-1">
      <Image
        src={backgroundImage}
        alt="Chat background"
        layout="fill"
        objectFit="cover"
        className="z-0"
      />

      <div className="relative flex-grow w-full">
        <div className="w-full flex flex-col gap-4">
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
        </div>
      </div>
    </ScrollArea>
  );
};

export default ChatScreen;
