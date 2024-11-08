export type Message = {
  userId?: string;
  content: string;
};

export type SocketContextType = {
  messages: Message[];
  sendMessage: (content: string) => void;
  isConnected: boolean;
  transport: string;
};
