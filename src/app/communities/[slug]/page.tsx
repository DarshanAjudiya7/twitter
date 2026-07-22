import Link from "next/link";
import { ArrowLeft, Users, ShieldCheck, Pin, ThumbsUp, MessageCircle, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getCommunityBySlug } from "@/actions/communities";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

import { JoinCommunityButton } from "@/components/interactions/JoinCommunityButton";

export default async function CommunityDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const res = await getCommunityBySlug(slug);

  if (!res.success || !res.data) {
    notFound();
  }

  const community = res.data;

  return (
    <div className="min-h-screen bg-background">
      {/* Banner */}
      <div className="h-56 relative overflow-hidden">
        <img src={community.banner || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200"} alt={community.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
      </div>

      <div className="container max-w-6xl mx-auto px-4 relative -mt-16 pb-16">
        <Link href="/communities" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-200 transition-colors mb-6">
          <ArrowLeft size={16} /> All Communities
        </Link>

        {/* Header Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-zinc-900/90 border border-zinc-800 p-6 rounded-2xl backdrop-blur-xl mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-zinc-800 border-2 border-zinc-700 text-3xl flex items-center justify-center shrink-0">
              {community.icon || "🚀"}
            </div>
            <div>
              <h1 className="text-2xl font-extrabold flex items-center gap-2">
                {community.name}
                <ShieldCheck className="text-indigo-400 shrink-0" size={20} />
              </h1>
              <p className="text-zinc-400 text-sm mt-1">{community.description}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-zinc-800 pt-4 md:pt-0">
            <div className="text-xs text-zinc-400">
              <span className="font-bold text-white text-base block">{(community as any).memberCount || 0}</span>
              Members
            </div>
            <JoinCommunityButton communityId={community.id} initialJoined={false} className="rounded-full px-6 bg-indigo-600 hover:bg-indigo-700 text-white" />
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            {/* Announcement Banner */}
            {community.announcement && (
              <div className="bg-gradient-to-r from-indigo-950/60 to-purple-950/60 border border-indigo-500/30 p-4 rounded-xl flex items-start gap-3">
                <Pin className="text-indigo-400 shrink-0 mt-0.5" size={18} />
                <div>
                  <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider block mb-1">Community Announcement</span>
                  <p className="text-sm text-zinc-200">{community.announcement}</p>
                </div>
              </div>
            )}

            {/* Create Post Action */}
            <div className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-xl flex items-center gap-3">
              <Avatar className="w-9 h-9">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Me" />
                <AvatarFallback>ME</AvatarFallback>
              </Avatar>
              <input
                type="text"
                placeholder="Start a discussion in this community..."
                className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-sm outline-none focus:border-indigo-500"
              />
              <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white">Post</Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-zinc-900/50 border border-zinc-800 p-5 rounded-xl">
              <h3 className="font-bold text-base mb-4 flex items-center gap-2">
                <ShieldCheck size={18} className="text-indigo-400" /> Community Guidelines
              </h3>
              <ul className="space-y-3 text-xs text-zinc-300 list-disc list-inside">
                <li>Be respectful and collaborative.</li>
                <li>Format code snippets cleanly.</li>
                <li>No spam or context-less self promotion.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
