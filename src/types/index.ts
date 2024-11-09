export type Message = {
  id?: string;
  userId?: string;
  content: string;
};

export type SocketContextType = {
  messages: Message[];
  sendMessage: (content: string) => void;
  deleteMessage: (id: string) => void;
  isConnected: boolean;
  transport: string;
};
