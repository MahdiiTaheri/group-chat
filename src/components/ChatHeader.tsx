"use client";

import { useSocket } from "@/context/SocketProvider";

function ChatHeader() {
  const { isConnected, transport } = useSocket();

  return (
    <>
      <h2 className="mb-5 text-xl font-semibold text-white bg-slate-700 p-2 rounded-lg w-1/4 text-center tracking-widest">
        Group Chat
      </h2>

      {/* Connection Status */}
      <div className="mb-4 text-sm">
        {isConnected ? (
          <span className="text-white bg-green-700 p-2 rounded-lg">
            Connected via {transport}
          </span>
        ) : (
          <span className="text-white bg-red-700 p-2 rounded-lg">
            Disconnected
          </span>
        )}
      </div>
    </>
  );
}

export default ChatHeader;
