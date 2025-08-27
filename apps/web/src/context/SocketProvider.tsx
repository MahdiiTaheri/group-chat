"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { toast } from "sonner";
import { socket } from "../socket";
import { Message, SocketContextType } from "@/types";

const SocketContext = createContext<SocketContextType | undefined>(undefined);

function SocketProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  const [socketId, setSocketId] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (socket.connected) onConnect();

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);
      setSocketId(socket.id);

      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
      setSocketId(undefined);
    }

    function onReceiveMessage(message: Message) {
      setMessages((prev) => [...prev, message]);
    }

    function onServerMessage(message: Message) {
      let emoji = "💬";
      if (message.content.includes("joined")) emoji = "👋";
      else if (
        message.content.includes("left") ||
        message.content.includes("disconnected")
      ) {
        emoji = "❌";
      }

      toast(`${emoji} ${message.content}`);
    }

    function onDeleteMessage(messageId: string) {
      setMessages((prev) => prev.filter((message) => message.id !== messageId));
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("receiveMessage", onReceiveMessage);
    socket.on("serverMessage", onServerMessage);
    socket.on("deleteMessage", onDeleteMessage);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("receiveMessage", onReceiveMessage);
      socket.off("serverMessage", onServerMessage);
      socket.off("deleteMessage", onDeleteMessage);
    };
  }, []);

  const sendMessage = useCallback((content: string) => {
    const message = { userId: socket.id, content };
    socket.emit("sendMessage", message);
  }, []);

  const deleteMessage = useCallback((messageId: string) => {
    socket.emit("deleteMessage", messageId);
  }, []);

  return (
    <SocketContext.Provider
      value={{
        messages,
        sendMessage,
        deleteMessage,
        isConnected,
        transport,
        socketId,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

const useSocket = (): SocketContextType => {
  const context = useContext(SocketContext);
  if (!context)
    throw new Error("useSocket must be used within a SocketProvider");
  return context;
};

export { useSocket, SocketProvider };
