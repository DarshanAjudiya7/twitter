import { ReactNode } from "react";
import { ChatSidebar } from "@/components/chat/ChatSidebar";
import { requireAuth } from "@/lib/auth-guard";

import { getChannels } from "@/actions/chat";
import { getCommunities } from "@/actions/communities";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function ChatLayout({ children }: { children: ReactNode }) {
  await requireAuth();

  const session = await auth.api.getSession({
    headers: await headers()
  });

  const [channelsRes, communitiesRes] = await Promise.all([
    getChannels(),
    getCommunities(),
  ]);

  const channels = channelsRes.data || [];
  const communities = communitiesRes.data || [];

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <ChatSidebar channels={channels} communities={communities} user={session?.user} />
      <main className="flex-1 flex flex-col h-full relative">
        {children}
      </main>
    </div>
  );
}
