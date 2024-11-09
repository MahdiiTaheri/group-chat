import dynamic from "next/dynamic";

const ChatHeader = dynamic(() => import("@/components/ChatHeader"));
const ChatInput = dynamic(() => import("@/components/ChatInput"));
const ChatScreen = dynamic(() => import("@/components/ChatScreen"));

import * as motion from "framer-motion/client";
import { slideInProps } from "@/lib/motions";

const ChatPage = () => {
  return (
    <div className="bg-gradient-to-r from-gray-100 to-gray-200">
      <motion.div
        className="flex h-screen flex-col items-center justify-between  p-4"
        {...slideInProps}
      >
        <ChatHeader />
        <ChatScreen />
        <ChatInput />
      </motion.div>
    </div>
  );
};

export default ChatPage;
