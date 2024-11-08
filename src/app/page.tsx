import dynamic from "next/dynamic";

const ChatHeader = dynamic(() => import("@/components/ChatHeader"));
const ChatInput = dynamic(() => import("@/components/ChatInput"));
const ChatScreen = dynamic(() => import("@/components/ChatScreen"));

const ChatPage = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-between bg-gradient-to-r from-gray-100 to-gray-200 p-4">
      <ChatHeader />
      <ChatScreen />
      <ChatInput />
    </div>
  );
};

export default ChatPage;
