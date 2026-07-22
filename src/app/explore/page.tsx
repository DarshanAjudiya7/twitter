import Link from "next/link";
import { BookOpen, Filter, Hash, MessageSquare, Search, SlidersHorizontal, TrendingUp, UserRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { channels, communities, developers, discussions, posts } from "@/data/community-platform";

const filterGroups = ["Latest", "Trending", "Most liked", "Most commented", "Most viewed", "Featured", "Technology", "Author"];

export default function ExplorePage() {
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
            <div className="rounded-lg border border-white/10 bg-zinc-950/80">
              <div className="flex items-center gap-2 border-b border-white/10 p-4 text-lg font-semibold text-white"><BookOpen className="size-5 text-emerald-300" /> Blogs</div>
              <div className="divide-y divide-white/10">
                {posts.map((post) => (
                  <Link href={`/blogs/${post.slug}`} key={post.slug} className="block p-4 transition hover:bg-white/[0.03]">
                    <h2 className="font-semibold text-white">{post.title}</h2>
                    <p className="mt-2 text-sm leading-6 text-zinc-400">{post.excerpt}</p>
                    <div className="mt-3 flex flex-wrap gap-2">{post.tags.map((tag) => <Badge key={tag} variant="outline" className="border-white/10 text-zinc-300">#{tag}</Badge>)}</div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-white/10 bg-zinc-950/80">
              <div className="flex items-center gap-2 border-b border-white/10 p-4 text-lg font-semibold text-white"><UserRound className="size-5 text-sky-300" /> Developers</div>
              <div className="divide-y divide-white/10">
                {developers.map((developer) => (
                  <Link href={`/profile/${developer.username}`} key={developer.username} className="block p-4 transition hover:bg-white/[0.03]">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <h2 className="font-semibold text-white">{developer.name}</h2>
                        <p className="text-sm text-zinc-500">{developer.role} at {developer.company}</p>
                      </div>
                      <Badge variant="outline" className="border-emerald-400/20 text-emerald-200">{developer.level}</Badge>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">{developer.skills.slice(0, 4).map((skill) => <Badge key={skill} variant="outline" className="border-white/10 text-zinc-300">{skill}</Badge>)}</div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-white/10 bg-zinc-950/80">
              <div className="flex items-center gap-2 border-b border-white/10 p-4 text-lg font-semibold text-white"><Hash className="size-5 text-amber-300" /> Channels and communities</div>
              <div className="divide-y divide-white/10">
                {channels.map((channel) => (
                  <Link href={`/chat/${channel.id}`} key={channel.id} className="flex items-center justify-between p-4 transition hover:bg-white/[0.03]">
                    <span className="font-semibold text-white">#{channel.name}</span>
                    <span className="text-sm text-zinc-500">{channel.members.toLocaleString()} members</span>
                  </Link>
                ))}
                {communities.map((community) => (
                  <Link href="/communities" key={community.slug} className="flex items-center justify-between p-4 transition hover:bg-white/[0.03]">
                    <span className="font-semibold text-white">{community.name}</span>
                    <span className="text-sm text-zinc-500">{community.members}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-white/10 bg-zinc-950/80">
              <div className="flex items-center gap-2 border-b border-white/10 p-4 text-lg font-semibold text-white"><TrendingUp className="size-5 text-rose-300" /> Trending questions</div>
              <div className="divide-y divide-white/10">
                {discussions.map((discussion) => (
                  <Link href={`/chat/${discussion.channel}`} key={discussion.title} className="block p-4 transition hover:bg-white/[0.03]">
                    <h2 className="font-semibold text-white">{discussion.title}</h2>
                    <div className="mt-3 flex gap-4 text-sm text-zinc-500"><span>{discussion.votes} votes</span><span className="flex items-center gap-1"><MessageSquare className="size-4" /> {discussion.replies}</span></div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
