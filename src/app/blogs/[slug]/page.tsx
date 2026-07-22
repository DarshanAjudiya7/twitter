import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { ArrowLeft, BookmarkPlus, Clapperboard, Clock, Heart, MessageSquare, MoreHorizontal, Share2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getPostBySlug } from "@/data/community-platform";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const SAMPLE_CONTENT = `
## Why this matters

Large developer platforms need publishing, discussion, and collaboration to feel connected. The hard part is deciding which data should be instant, which data should be cached, and which interactions deserve optimistic UI.

### A practical boundary checklist

- Keep profile, article, and community summary data server-rendered when possible.
- Move composer controls, reactions, editor previews, and live chat into small Client Components.
- Use cursor pagination for feeds, messages, notifications, and follower lists.
- Cache public discovery pages, but revalidate author dashboards and notification counters more aggressively.

\`\`\`typescript
export type CommunityEvent = {
  id: string;
  actorId: string;
  targetId: string;
  type: "post.published" | "comment.created" | "message.sent";
  createdAt: Date;
};
\`\`\`

> Strong community systems make the useful path easy and the harmful path auditable.

## Production notes

A production implementation should connect these surfaces to persistent models for posts, comments, channels, reports, badges, and notifications. It should also add rate limits, input validation, upload scanning, moderation queues, audit logs, and observability around the real-time layer.
`;

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  return (
    <main className="min-h-screen bg-[#08090d] px-4 pb-16 pt-24 text-zinc-100 sm:px-6 lg:px-8">
      <article className="mx-auto max-w-4xl">
        <Link href="/blogs" className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-zinc-100">
          <ArrowLeft className="size-4" /> Back to blogs
        </Link>

        <header className="mb-8">
          <div className="mb-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="border-sky-400/25 bg-sky-400/10 text-sky-200">
                #{tag}
              </Badge>
            ))}
          </div>
          <h1 className="text-4xl font-semibold leading-tight tracking-normal text-white sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 text-lg leading-8 text-zinc-400">{post.excerpt}</p>

          <div className="mt-7 flex flex-col gap-4 border-y border-white/10 py-5 sm:flex-row sm:items-center sm:justify-between">
            <Link href={`/profile/${post.author.username}`} className="flex items-center gap-3">
              <Avatar className="size-12">
                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.author.avatarSeed}`} alt={post.author.name} />
                <AvatarFallback>{post.author.name.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-semibold text-white">{post.author.name}</div>
                <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-500">
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                  <span>{post.views} reads</span>
                </div>
              </div>
            </Link>
            <Button variant="outline" className="border-white/15 bg-white/5 text-white hover:bg-white/10">Follow author</Button>
          </div>
        </header>

        <div className="mb-8 overflow-hidden rounded-lg border border-white/10 bg-zinc-950">
          <img src={post.cover} alt="" className="aspect-video w-full object-cover" />
        </div>

        <div className="sticky top-20 z-20 mb-8 flex items-center justify-between rounded-lg border border-white/10 bg-zinc-950/90 px-4 py-3 backdrop-blur">
          <div className="flex items-center gap-5 text-sm text-zinc-400">
            <button className="flex items-center gap-2 transition hover:text-rose-300"><Heart className="size-4" /> {post.likes}</button>
            <button className="flex items-center gap-2 transition hover:text-amber-300"><Clapperboard className="size-4" /> {post.claps}</button>
            <button className="flex items-center gap-2 transition hover:text-sky-300"><MessageSquare className="size-4" /> {post.comments}</button>
          </div>
          <div className="flex items-center gap-3 text-zinc-400">
            <button aria-label="Bookmark" className="transition hover:text-white"><BookmarkPlus className="size-4" /></button>
            <button aria-label="Share" className="transition hover:text-white"><Share2 className="size-4" /></button>
            <button aria-label="More actions" className="transition hover:text-white"><MoreHorizontal className="size-4" /></button>
          </div>
        </div>

        <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-a:text-sky-300 prose-code:text-emerald-200">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
            {SAMPLE_CONTENT}
          </ReactMarkdown>
        </div>

        <section className="mt-14 border-t border-white/10 pt-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-white">Discussion</h2>
            <span className="flex items-center gap-1 text-sm text-zinc-500"><Clock className="size-4" /> Active now</span>
          </div>
          <div className="mb-8 flex gap-3">
            <Avatar><AvatarFallback>ME</AvatarFallback></Avatar>
            <div className="flex-1">
              <textarea className="min-h-28 w-full resize-none rounded-lg border border-white/10 bg-zinc-950 p-4 text-sm outline-none ring-sky-400/40 placeholder:text-zinc-600 focus:ring-2" placeholder="Add a thoughtful comment, code example, or follow-up question..." />
              <div className="mt-3 flex justify-end">
                <Button className="bg-sky-300 text-slate-950 hover:bg-sky-200">Comment</Button>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="rounded-lg border border-white/10 bg-zinc-950/80 p-4">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-semibold text-white">Maya Kapoor</span>
                <span className="text-zinc-600">12 min ago</span>
              </div>
              <p className="text-sm leading-6 text-zinc-400">
                The cache boundary checklist is the part I wish every architecture doc included. It makes review conversations much easier.
              </p>
              <div className="mt-3 flex gap-4 text-xs font-medium text-zinc-500">
                <button className="hover:text-white">Upvote (18)</button>
                <button className="hover:text-white">Reply</button>
                <button className="hover:text-white">Report</button>
              </div>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
