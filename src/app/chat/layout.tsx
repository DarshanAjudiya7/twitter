import { ReactNode } from "react";
import { ChatSidebar } from "@/components/chat/ChatSidebar";

export default function ChatLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <ChatSidebar />
      <main className="flex-1 flex flex-col h-full relative">
        {children}
      </main>
    </div>
  );
}
