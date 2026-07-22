import Link from "next/link";
import { Hash, MessageSquare, ShieldCheck, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getChannels } from "@/actions/chat";
import { getCommunities } from "@/actions/communities";

export default async function ChatIndexPage() {
  const [channelsRes, communitiesRes] = await Promise.all([
    getChannels(),
    getCommunities(),
  ]);

  const channels = channelsRes.data || [];
  const communities = communitiesRes.data || [];

  return (
    <main className="flex min-h-screen flex-1 flex-col bg-[#08090d] p-4 pt-24 text-zinc-100 md:pt-6">
      <div className="mx-auto flex h-full w-full max-w-5xl flex-1 flex-col justify-center">
        <Badge variant="outline" className="mb-4 w-fit border-sky-400/25 bg-sky-400/10 text-sky-200">
          Real-time communication
        </Badge>
        <h1 className="text-4xl font-semibold tracking-normal text-white">Choose a channel and start building with the community.</h1>
        <p className="mt-3 max-w-2xl text-zinc-400">
          Channels support announcements, public discussion, invite-only spaces, DMs, typing state, read receipts, reactions, pins, files, and code snippets.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {channels.slice(0, 4).map((channel) => (
            <Link href={`/chat/${channel.id}`} key={channel.id} className="rounded-lg border border-white/10 bg-zinc-950/80 p-5 transition hover:border-sky-400/30 hover:bg-sky-400/10">
              <div className="mb-4 flex items-center justify-between">
                <Hash className="size-5 text-sky-300" />
                <span className="text-xs text-zinc-500">{(channel as any).memberCount || 0} members</span>
              </div>
              <h2 className="text-xl font-semibold text-white">#{channel.name}</h2>
              <p className="mt-2 text-sm text-zinc-400">{channel.type} channel. {channel.description}</p>
            </Link>
          ))}
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-white/10 bg-zinc-950/80 p-4"><MessageSquare className="mb-3 size-5 text-sky-300" /><h2 className="font-semibold text-white">DMs and groups</h2><p className="mt-2 text-sm text-zinc-500">Private chats, requests, admins, avatars, and member controls.</p></div>
          <div className="rounded-lg border border-white/10 bg-zinc-950/80 p-4"><Users className="mb-3 size-5 text-emerald-300" /><h2 className="font-semibold text-white">Community channels</h2><p className="mt-2 text-sm text-zinc-500">Categories, permissions, announcement lanes, and invite-only rooms.</p></div>
          <div className="rounded-lg border border-white/10 bg-zinc-950/80 p-4"><ShieldCheck className="mb-3 size-5 text-amber-300" /><h2 className="font-semibold text-white">Safety controls</h2><p className="mt-2 text-sm text-zinc-500">Reports, moderation queues, audit logs, block and mute flows.</p></div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {channels[0] && (
            <Button asChild className="bg-sky-300 text-slate-950 hover:bg-sky-200">
              <Link href={`/chat/${channels[0].id}`}>Open {channels[0].name}</Link>
            </Button>
          )}
          <Button asChild variant="outline" className="border-white/15 bg-white/5 text-white hover:bg-white/10">
            <Link href="/communities">Browse {communities.length} communities</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
