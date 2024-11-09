"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { socket } from "../socket";
import { Message, SocketContextType } from "@/types";

const SocketContext = createContext<SocketContextType | undefined>(undefined);

function SocketProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    function onReceiveMessage(message: Message) {
      setMessages((prevMessages) => [...prevMessages, message]);
    }

    function onServerMessage(message: Message) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { userId: "server", content: message.content },
      ]);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("receiveMessage", onReceiveMessage);
    socket.on("serverMessage", onServerMessage);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("receiveMessage", onReceiveMessage);
      socket.off("serverMessage", onServerMessage);
    };
  }, []);

  const sendMessage = useCallback((content: string) => {
    const message = { userId: socket.id, content };
    socket.emit("sendMessage", message);
  }, []);

  return (
    <SocketContext.Provider
      value={{ messages, sendMessage, isConnected, transport }}
    >
      {children}
    </SocketContext.Provider>
  );
}

const useSocket = (): SocketContextType => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

export { useSocket, SocketProvider };
