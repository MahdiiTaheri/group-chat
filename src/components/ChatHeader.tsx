"use client";

import { useSocket } from "@/context/SocketProvider";

function ChatHeader() {
  const { isConnected, transport } = useSocket();

  return (
    <>
      <h2 className="mb-5 text-xl font-semibold text-white bg-gradient-to-tr from-header-1 to-header-2 p-2 rounded-lg md:w-1/4 w-1/2 text-center tracking-widest">
        Group Chat
      </h2>

      {/* Connection Status */}
      <div className="mb-8 text-sm">
        {isConnected ? (
          <span className="text-white bg-gradient-to-tr from-transport-1 to-transport-2 p-2 rounded-lg">
            Connected via{" "}
            <span className="underline font-bold">{transport}</span>
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
