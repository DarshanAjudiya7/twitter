import Link from "next/link";
import {
  Bell,
  Bookmark,
  Flame,
  Hash,
  MessageCircle,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  BookOpen,
  Code2,
  Trophy
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { getBlogs } from "@/actions/blogs";
import { getLeaderboardAction } from "@/actions/profile";
import { getChannels } from "@/actions/chat";
import { getCommunities } from "@/actions/communities";

const platformStats = [
  { label: "active developers", value: "24.8K" },
  { label: "weekly discussions", value: "8.2K" },
  { label: "published guides", value: "3.9K" },
  { label: "community answers", value: "18.4K" },
];

const featurePillars = [
  {
    title: "Real-time collaboration",
    description: "Channels, direct messages, typing indicators, read status, pinned context, file sharing, and code-aware conversations.",
    icon: MessageCircle,
    tone: "text-sky-300 bg-sky-400/10 border-sky-400/20",
  },
  {
    title: "Publishing workspace",
    description: "Markdown posts, rich technical tutorials, drafts, scheduled publishing, tags, series, SEO fields, reactions, and nested comments.",
    icon: BookOpen,
    tone: "text-emerald-300 bg-emerald-400/10 border-emerald-400/20",
  },
  {
    title: "Professional identity",
    description: "Developer profiles with skills, projects, GitHub links, reputation, badges, followers, activity, and community contribution history.",
    icon: Code2,
    tone: "text-amber-300 bg-amber-400/10 border-amber-400/20",
  },
  {
    title: "Moderated communities",
    description: "Topic hubs with admins, moderators, announcements, reports, audit trails, role permissions, and trust and safety controls.",
    icon: ShieldCheck,
    tone: "text-rose-300 bg-rose-400/10 border-rose-400/20",
  },
];

const roadmap = [
  { label: "Messaging", status: "Live", icon: MessageCircle },
  { label: "Publishing", status: "Live", icon: BookOpen },
  { label: "Communities", status: "Live", icon: Hash },
  { label: "Notifications", status: "Live", icon: Bell },
  { label: "Gamification", status: "Beta", icon: Trophy },
  { label: "Moderation", status: "Beta", icon: ShieldCheck },
  { label: "Profiles", status: "Live", icon: Users },
];

export default async function Home() {
  const [blogsRes, usersRes, channelsRes, communitiesRes] = await Promise.all([
    getBlogs(),
    getLeaderboardAction(),
    getChannels(),
    getCommunities(),
  ]);

  const posts = blogsRes.data || [];
  const developers = usersRes.data || [];
  const channels = channelsRes.data || [];
  const communities = communitiesRes.data || [];

  const featuredPost = posts.length > 0 ? posts[0] : null;

  return (
    <main className="min-h-screen bg-[#08090d] text-zinc-100">
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.18),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent)] px-4 pb-8 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="flex min-h-[520px] flex-col justify-between rounded-lg border border-white/10 bg-black/20 p-5 shadow-2xl shadow-black/30 backdrop-blur md:p-7">
            <div>
              <div className="mb-6 flex flex-wrap items-center gap-2">
                <Badge variant="outline" className="border-sky-400/30 bg-sky-400/10 text-sky-200">
                  Developer community platform
                </Badge>
                <Badge variant="outline" className="border-emerald-400/30 bg-emerald-400/10 text-emerald-200">
                  Real-time ready
                </Badge>
              </div>
              <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-normal text-white sm:text-5xl lg:text-6xl">
                Build, publish, discuss, and grow with developers in one shared workspace.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-300 sm:text-lg">
                A Discord-inspired community shell, a Dev.to-style publishing flow, Reddit-like discussions, and LinkedIn-grade developer profiles now live together in the app.
              </p>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {platformStats.map((stat) => (
                <div key={stat.label} className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                  <div className="text-2xl font-semibold text-white">{stat.value}</div>
                  <div className="mt-1 text-xs uppercase tracking-wide text-zinc-500">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild className="bg-sky-300 text-slate-950 hover:bg-sky-200">
                <Link href="/chat">
                  <MessageCircle /> Open chat
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-white/15 bg-white/5 text-white hover:bg-white/10">
                <Link href="/blogs/new">Write a post</Link>
              </Button>
              <Button asChild variant="ghost" className="text-zinc-300 hover:bg-white/10 hover:text-white">
                <Link href="/communities">Explore communities</Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-lg border border-white/10 bg-zinc-950/80 p-4">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wide text-zinc-500">Live channels</p>
                  <h2 className="text-lg font-semibold text-white">Community activity</h2>
                </div>
                <Bell className="size-5 text-sky-300" />
              </div>
              <div className="space-y-2">
                {channels.slice(0, 4).map((channel) => (
                  <Link
                    href={`/chat/${channel.id}`}
                    key={channel.id}
                    className="flex items-center justify-between rounded-md border border-white/5 bg-white/[0.03] px-3 py-2 text-sm transition hover:border-sky-400/30 hover:bg-sky-400/10"
                  >
                    <span className="flex items-center gap-2 font-medium text-zinc-200">
                      <Hash className="size-4 text-zinc-500" /> {channel.name}
                    </span>
                    <span className="text-xs text-zinc-500">{(channel as any).memberCount || 0} members</span>
                  </Link>
                ))}
              </div>
            </div>

            {featuredPost && (
              <article className="overflow-hidden rounded-lg border border-white/10 bg-zinc-950/80">
                <img src={featuredPost.coverImage || "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1200"} alt="" className="h-44 w-full object-cover" />
                <div className="p-4">
                  <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-zinc-500">
                    <Badge variant="outline" className="border-amber-400/30 bg-amber-400/10 text-amber-200">
                      Featured
                    </Badge>
                    <span>{featuredPost.readTime || 5} min read</span>
                  </div>
                  <Link href={`/blogs/${featuredPost.slug}`}>
                    <h2 className="text-2xl font-semibold leading-tight text-white hover:text-sky-200">
                      {featuredPost.title}
                    </h2>
                  </Link>
                  <p className="mt-3 text-sm leading-6 text-zinc-400 line-clamp-2">{featuredPost.content}</p>
                </div>
              </article>
            )}
          </div>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[260px_minmax(0,1fr)_320px]">
          <aside className="space-y-4 lg:sticky lg:top-24 lg:h-fit">
            <div className="rounded-lg border border-white/10 bg-zinc-950/80 p-4">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
                <Search className="size-4 text-sky-300" /> Search everything
              </div>
              <div className="rounded-md border border-white/10 bg-black/30 px-3 py-2 text-sm text-zinc-500">
                Developers, blogs, tags, channels
              </div>
            </div>
            <div className="rounded-lg border border-white/10 bg-zinc-950/80 p-4">
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-500">Platform modules</h2>
              <div className="space-y-2">
                {roadmap.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex items-center justify-between rounded-md px-2 py-2 text-sm text-zinc-300">
                      <span className="flex items-center gap-2"><Icon className="size-4 text-zinc-500" />{item.label}</span>
                      <span className="text-xs text-zinc-600">{item.status}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </aside>

          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              {featurePillars.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div key={feature.title} className="rounded-lg border border-white/10 bg-zinc-950/80 p-5">
                    <div className={`mb-4 inline-flex size-10 items-center justify-center rounded-md border ${feature.tone}`}>
                      <Icon className="size-5" />
                    </div>
                    <h2 className="text-lg font-semibold text-white">{feature.title}</h2>
                    <p className="mt-2 text-sm leading-6 text-zinc-400">{feature.description}</p>
                  </div>
                );
              })}
            </div>

            <div className="rounded-lg border border-white/10 bg-zinc-950/80">
              <div className="flex items-center justify-between border-b border-white/10 p-4">
                <div>
                  <p className="text-xs uppercase tracking-wide text-zinc-500">Trending Blogs</p>
                  <h2 className="text-lg font-semibold text-white">Articles developers are reading</h2>
                </div>
                <Flame className="size-5 text-amber-300" />
              </div>
              <div className="divide-y divide-white/10">
                {posts.slice(0, 4).map((post) => (
                  <Link href={`/blogs/${post.slug}`} key={post.slug} className="block p-4 transition hover:bg-white/[0.03]">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
                      <span>by @{(post as any).authorName || "Anonymous"}</span>
                    </div>
                    <h3 className="mt-2 font-semibold text-zinc-100">{post.title}</h3>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-24 lg:h-fit">
            <div className="rounded-lg border border-white/10 bg-zinc-950/80 p-4">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">Top developers</h2>
                <Users className="size-4 text-zinc-500" />
              </div>
              <div className="space-y-3">
                {developers.slice(0, 5).map((developer) => (
                  <Link href={`/profile/${developer.id}`} key={developer.id} className="flex items-center justify-between rounded-md p-2 transition hover:bg-white/[0.04]">
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold text-white">{developer.name}</div>
                      <div className="truncate text-xs text-zinc-500">{developer.reputationScore} XP</div>
                    </div>
                    <Badge variant="outline" className="border-emerald-400/20 text-emerald-200">View</Badge>
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-white/10 bg-zinc-950/80 p-4">
              <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-white">
                <TrendingUp className="size-4 text-emerald-300" /> Top communities
              </div>
              <div className="space-y-2">
                {communities.slice(0, 4).map((community) => (
                  <Link href={`/communities/${community.slug}`} key={community.slug} className="flex items-center justify-between rounded-md px-2 py-2 text-sm transition hover:bg-white/[0.04]">
                    <span className="text-zinc-200">{community.name}</span>
                    <span className="text-xs text-zinc-500">{(community as any).memberCount || 0}</span>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
