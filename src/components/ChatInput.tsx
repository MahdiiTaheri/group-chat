"use client";

import { useState } from "react";
import { useSocket } from "@/context/SocketProvider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Trash } from "lucide-react";

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
    <div className="mt-4 flex w-full max-w-4xl items-center gap-3 p-6">
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
        className="h-12 px-6 text-lg bg-chat-gradient-1 hover:bg-chat-gradient-2 shadow-lg"
      >
        Send
        <Send />
      </Button>

      <Button
        onClick={() => setInput("")}
        variant="outline"
        size="lg"
        className="h-12 px-6 text-lg hover:border-red-700 hover:bg-red-100"
        disabled={input.length === 0}
      >
        <Trash className="stroke-red-700" />
      </Button>
    </div>
  );
};

export default ChatInput;
