import { ReactNode } from "react";
import { ChatSidebar } from "@/components/chat/ChatSidebar";
import { requireAuth } from "@/lib/auth-guard";

export default async function ChatLayout({ children }: { children: ReactNode }) {
  await requireAuth();

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <ChatSidebar />
      <main className="flex-1 flex flex-col h-full relative">
        {children}
      </main>
    </div>
  );
}
