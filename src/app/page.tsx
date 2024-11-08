"use client";

import ChatScreen from "@/components/ChatScreen";
import { useSocket } from "@/context/SocketProvider";

const ChatPage = () => {
  const { isConnected, transport } = useSocket();

  return (
    <div className="flex h-screen flex-col items-center justify-between bg-gray-500 p-4">
      <h2 className="mb-4 text-xl font-semibold text-white">Chat</h2>

      {/* Connection Status */}
      <div className="mb-2 text-sm text-gray-500">
        {isConnected ? (
          <span className="text-green-500">Connected via {transport}</span>
        ) : (
          <span className="text-red-500">Disconnected</span>
        )}
      </div>

      <ChatScreen />
    </div>
  );
};

export default ChatPage;
