import Link from "next/link";
import { BookOpen, Filter, Hash, MessageSquare, Search, SlidersHorizontal, TrendingUp, UserRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { getBlogs } from "@/actions/blogs";
import { getLeaderboardAction } from "@/actions/profile";
import { getChannels } from "@/actions/chat";
import { getCommunities } from "@/actions/communities";

const filterGroups = ["Latest", "Trending", "Most liked", "Most commented", "Most viewed", "Featured", "Technology", "Author"];

export default async function ExplorePage() {
  // Fetch live data
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

  return (
    <main className="min-h-screen bg-[#08090d] px-4 pb-14 pt-24 text-zinc-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 border-b border-white/10 pb-8">
          <Badge variant="outline" className="mb-4 border-sky-400/25 bg-sky-400/10 text-sky-200">
            Powerful search
          </Badge>
          <h1 className="text-4xl font-semibold tracking-normal text-white sm:text-5xl">Explore the developer graph</h1>
          <p className="mt-3 max-w-2xl text-zinc-400">
            Search across developers, blogs, tags, messages, channels, and communities with filters designed for technical discovery.
          </p>
          <div className="mt-6 flex max-w-3xl items-center gap-3 rounded-lg border border-white/10 bg-zinc-950/90 p-3 focus-within:ring-2 focus-within:ring-sky-400/40">
            <Search className="size-5 text-zinc-500" />
            <input className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-600" placeholder="Try: nextjs caching, AI evals, incident response, @alicedev..." />
            <Button className="bg-sky-300 text-slate-950 hover:bg-sky-200">Search</Button>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="space-y-4 lg:sticky lg:top-24 lg:h-fit">
            <div className="rounded-lg border border-white/10 bg-zinc-950/80 p-4">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-zinc-500">
                <SlidersHorizontal className="size-4" /> Filters
              </div>
              <div className="space-y-1">
                {filterGroups.map((filter) => (
                  <button key={filter} className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm text-zinc-300 transition hover:bg-white/[0.05] hover:text-white">
                    {filter}
                    <Filter className="size-3.5 text-zinc-600" />
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <section className="grid gap-6 xl:grid-cols-2">
            <div className="rounded-lg border border-white/10 bg-zinc-950/80 max-h-[600px] overflow-y-auto">
              <div className="flex items-center gap-2 border-b border-white/10 p-4 text-lg font-semibold text-white sticky top-0 bg-zinc-950"><BookOpen className="size-5 text-emerald-300" /> Blogs</div>
              <div className="divide-y divide-white/10">
                {posts.map((post) => (
                  <Link href={`/blogs/${post.slug}`} key={post.slug} className="block p-4 transition hover:bg-white/[0.03]">
                    <h2 className="font-semibold text-white">{post.title}</h2>
                    <p className="mt-2 text-sm leading-6 text-zinc-400 line-clamp-2">{post.content}</p>
                    <div className="mt-3 flex flex-wrap gap-2 text-xs text-emerald-400">
                      {(post as any).authorName || "Anonymous"} • {post.readTime} min read
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-white/10 bg-zinc-950/80 max-h-[600px] overflow-y-auto">
              <div className="flex items-center gap-2 border-b border-white/10 p-4 text-lg font-semibold text-white sticky top-0 bg-zinc-950"><UserRound className="size-5 text-sky-300" /> Developers</div>
              <div className="divide-y divide-white/10">
                {developers.map((developer) => (
                  <Link href={`/profile/${developer.id}`} key={developer.id} className="block p-4 transition hover:bg-white/[0.03]">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <h2 className="font-semibold text-white">{developer.name}</h2>
                        <p className="text-sm text-zinc-500">{developer.company || developer.email}</p>
                      </div>
                      <Badge variant="outline" className="border-emerald-400/20 text-emerald-200">
                        {developer.reputationScore} XP
                      </Badge>
                    </div>
                    {developer.bio && <p className="mt-2 text-sm text-zinc-400 line-clamp-1">{developer.bio}</p>}
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-white/10 bg-zinc-950/80 md:col-span-2">
              <div className="flex items-center gap-2 border-b border-white/10 p-4 text-lg font-semibold text-white"><Hash className="size-5 text-amber-300" /> Channels and communities</div>
              <div className="divide-y divide-white/10 grid grid-cols-1 md:grid-cols-2">
                <div className="border-r border-white/10 divide-y divide-white/10">
                  <div className="p-3 bg-white/5 font-medium text-sm text-zinc-400">Active Channels</div>
                  {channels.map((channel) => (
                    <Link href={`/chat/${channel.id}`} key={channel.id} className="flex items-center justify-between p-4 transition hover:bg-white/[0.03]">
                      <span className="font-semibold text-white">#{channel.name}</span>
                      <span className="text-sm text-zinc-500">{(channel as any).memberCount || 0} members</span>
                    </Link>
                  ))}
                </div>
                <div className="divide-y divide-white/10">
                  <div className="p-3 bg-white/5 font-medium text-sm text-zinc-400">Top Communities</div>
                  {communities.map((community) => (
                    <Link href={`/communities/${community.slug}`} key={community.slug} className="flex items-center justify-between p-4 transition hover:bg-white/[0.03]">
                      <span className="font-semibold text-white">{community.name}</span>
                      <span className="text-sm text-zinc-500">{(community as any).memberCount || 0} members</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
