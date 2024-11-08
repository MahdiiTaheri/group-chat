"use client";

import { useState } from "react";
import { useSocket } from "@/context/SocketProvider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ChatInput = () => {
  const { sendMessage } = useSocket();
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (input.trim()) {
      sendMessage(input);
      setInput("");
    }
  };

  return (
    <div className="mt-4 flex w-full max-w-xl items-center gap-3 p-6">
      <Input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="h-12 text-lg px-4 py-2 flex-grow bg-white rounded-lg"
        placeholder="Type a message..."
      />
      <Button
        onClick={handleSendMessage}
        size="lg"
        className="h-12 px-6 text-lg bg-[#2d55fb]"
      >
        Send
      </Button>
    </div>
  );
};

export default ChatInput;
