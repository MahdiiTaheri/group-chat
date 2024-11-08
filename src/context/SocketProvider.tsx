"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { socket } from "../socket";

type Message = {
  userId?: string;
  content: string;
};

type SocketContextType = {
  messages: Message[];
  sendMessage: (content: string) => void;
  isConnected: boolean;
  transport: string;
};

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

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("receiveMessage", onReceiveMessage);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("receiveMessage", onReceiveMessage);
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
