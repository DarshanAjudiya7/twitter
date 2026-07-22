"use client";

import Link from "next/link";
import { Bell, Hash, Lock, MessageSquare, Plus, Radio, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { channels, communities, directMessages } from "@/data/community-platform";

export function ChatSidebar() {
  return (
    <aside className="hidden h-screen w-72 shrink-0 flex-col border-r border-white/10 bg-zinc-950 text-zinc-300 md:flex">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">DevCircle</h2>
            <p className="text-xs text-zinc-500">Developer community</p>
          </div>
          <button aria-label="Create" className="rounded-md border border-white/10 bg-white/[0.04] p-2 transition hover:bg-white/10">
            <Plus className="size-4" />
          </button>
        </div>
      </div>
      <Separator className="bg-white/10" />

      <div className="flex-1 space-y-6 overflow-y-auto p-3">
        <section>
          <div className="mb-2 flex items-center justify-between px-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
            <span>Communities</span>
            <Shield className="size-3.5" />
          </div>
          <div className="space-y-1">
            {communities.map((community) => (
              <Link key={community.slug} href="/communities" className="flex items-center justify-between rounded-md px-2 py-2 text-sm transition hover:bg-white/[0.05] hover:text-white">
                <span className="truncate">{community.name}</span>
                <span className="text-xs text-zinc-600">{community.online}</span>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-2 flex items-center justify-between px-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
            <span>Channels</span>
            <Plus className="size-3.5" />
          </div>
          <div className="space-y-1">
            {channels.map((channel) => (
              <Link key={channel.id} href={`/chat/${channel.id}`} className="group flex items-center justify-between rounded-md px-2 py-2 text-sm transition hover:bg-white/[0.05] hover:text-white">
                <span className="flex min-w-0 items-center gap-2">
                  {channel.kind === "Invite" ? <Lock className="size-4 text-zinc-500" /> : channel.kind === "Read-only" ? <Bell className="size-4 text-zinc-500" /> : <Hash className="size-4 text-zinc-500" />}
                  <span className="truncate">{channel.name}</span>
                </span>
                {channel.unread ? <Badge variant="outline" className="h-5 border-sky-400/20 bg-sky-400/10 text-sky-200">{channel.unread}</Badge> : null}
              </Link>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-2 flex items-center justify-between px-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
            <span>Direct messages</span>
            <Plus className="size-3.5" />
          </div>
          <div className="space-y-1">
            {directMessages.map((dm) => (
              <Link key={dm.id} href={`/chat/${dm.id}`} className="flex items-center justify-between rounded-md px-2 py-2 text-sm transition hover:bg-white/[0.05] hover:text-white">
                <span className="flex min-w-0 items-center gap-2">
                  <span className={`size-2 rounded-full ${dm.status === "online" ? "bg-emerald-400" : dm.status === "typing" ? "bg-sky-400" : "bg-amber-400"}`} />
                  <span className="truncate">{dm.name}</span>
                </span>
                {dm.unread ? <span className="text-xs text-sky-300">{dm.unread}</span> : null}
              </Link>
            ))}
          </div>
        </section>
      </div>

      <div className="border-t border-white/10 bg-black/30 p-3">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-md bg-sky-300 font-semibold text-slate-950">ME</div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-semibold text-white">My Username</div>
            <div className="flex items-center gap-1 text-xs text-emerald-300"><Radio className="size-3" /> Online</div>
          </div>
          <MessageSquare className="size-4 text-zinc-500" />
        </div>
      </div>
    </aside>
  );
}
