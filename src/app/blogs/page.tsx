import Link from "next/link";
import { BookmarkPlus, Clock, Heart, MessageSquare, PenLine, Search, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { communities, posts } from "@/data/community-platform";

const filters = ["Latest", "Trending", "Most liked", "Most commented", "Featured"];
const tags = ["nextjs", "react", "ai", "agents", "devops", "python", "typescript", "security"];

export default function BlogsPage() {
  return (
    <main className="min-h-screen bg-[#08090d] px-4 pb-12 pt-24 text-zinc-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col gap-5 border-b border-white/10 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Badge variant="outline" className="mb-4 border-emerald-400/30 bg-emerald-400/10 text-emerald-200">
              Publishing hub
            </Badge>
            <h1 className="text-4xl font-semibold tracking-normal text-white sm:text-5xl">Developer Blogs</h1>
            <p className="mt-3 max-w-2xl text-zinc-400">
              Technical essays, tutorials, series, code walkthroughs, and community knowledge with Markdown-first authoring.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="outline" className="border-white/15 bg-white/5 text-white hover:bg-white/10">
              <Link href="/explore"><Search /> Search posts</Link>
            </Button>
            <Button asChild className="bg-emerald-300 text-emerald-950 hover:bg-emerald-200">
              <Link href="/blogs/new"><PenLine /> Write a post</Link>
            </Button>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="space-y-4 lg:sticky lg:top-24 lg:h-fit">
            <div className="rounded-lg border border-white/10 bg-zinc-950/80 p-4">
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-500">Filters</h2>
              <div className="space-y-1">
                {filters.map((filter) => (
                  <button key={filter} className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm text-zinc-300 transition hover:bg-white/[0.05] hover:text-white">
                    {filter}
                    {filter === "Trending" ? <Sparkles className="size-4 text-amber-300" /> : null}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-white/10 bg-zinc-950/80 p-4">
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-500">Popular tags</h2>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="border-white/10 bg-white/[0.03] text-zinc-300">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-white/10 bg-zinc-950/80 p-4">
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-500">Community journals</h2>
              <div className="space-y-2">
                {communities.map((community) => (
                  <Link href="/communities" key={community.slug} className="flex items-center justify-between rounded-md px-2 py-2 text-sm transition hover:bg-white/[0.04]">
                    <span className="text-zinc-200">{community.name}</span>
                    <span className="text-xs text-zinc-500">{community.posts}</span>
                  </Link>
                ))}
              </div>
            </div>
          </aside>

          <section className="space-y-5">
            {posts.map((blog) => (
              <article key={blog.slug} className="group grid overflow-hidden rounded-lg border border-white/10 bg-zinc-950/80 transition hover:border-sky-400/30 md:grid-cols-[280px_minmax(0,1fr)]">
                <Link href={`/blogs/${blog.slug}`} className="block min-h-56 overflow-hidden bg-zinc-900">
                  <img src={blog.cover} alt="" className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
                </Link>
                <div className="flex flex-col p-5">
                  <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-zinc-500">
                    <Badge variant="outline" className="border-sky-400/25 bg-sky-400/10 text-sky-200">
                      {blog.community}
                    </Badge>
                    <span>{blog.date}</span>
                    <span>{blog.readTime}</span>
                    {blog.featured ? <span className="text-amber-300">Featured</span> : null}
                  </div>
                  <Link href={`/blogs/${blog.slug}`}>
                    <h2 className="text-2xl font-semibold leading-tight text-white transition group-hover:text-sky-200">
                      {blog.title}
                    </h2>
                  </Link>
                  <p className="mt-3 text-sm leading-6 text-zinc-400">{blog.excerpt}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {blog.tags.map((tag) => (
                      <span key={tag} className="text-xs font-medium text-zinc-500">#{tag}</span>
                    ))}
                  </div>
                  <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4 text-sm text-zinc-500">
                    <Link href={`/profile/${blog.author.username}`} className="font-medium text-zinc-300 hover:text-white">
                      {blog.author.name}
                    </Link>
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1"><Heart className="size-4" /> {blog.likes}</span>
                      <span className="flex items-center gap-1"><MessageSquare className="size-4" /> {blog.comments}</span>
                      <span className="flex items-center gap-1"><Clock className="size-4" /> {blog.views}</span>
                      <button aria-label="Bookmark post" className="transition hover:text-white"><BookmarkPlus className="size-4" /></button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </section>
        </div>
      </div>
    </main>
  );
}
