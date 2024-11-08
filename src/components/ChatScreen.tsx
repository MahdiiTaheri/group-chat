"use client";

import { useSocket } from "@/context/SocketProvider";
import ChatMessage from "@/components/ChatMessage";
import { ScrollArea } from "@/components/ui/scroll-area";

const ChatScreen = () => {
  const { messages } = useSocket();

  return (
    <ScrollArea className="flex-grow w-full max-w-xl rounded-lg border border-gray-200 px-6 py-3 shadow-md bg-chat-screen bg-cover">
      <div className="space-y-3 w-full flex flex-col ">
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
      </div>
    </ScrollArea>
  );
};

export default ChatScreen;
