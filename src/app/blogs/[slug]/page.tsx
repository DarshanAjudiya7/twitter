import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { ArrowLeft, Clock, MessageSquare, Heart, BookmarkPlus, Share2, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const SAMPLE_CONTENT = `
## Introduction
Next.js 14 brings a paradigm shift to how we write React applications. With the stabilization of Server Actions, you can now write mutations directly in your server components without manually creating API endpoints.

### What are Server Actions?
Server Actions are asynchronous functions that run on the server. They can be called directly from your client components or server components to handle form submissions and data mutations.

\`\`\`typescript
// app/actions.ts
'use server'
 
export async function createPost(formData: FormData) {
  const title = formData.get('title')
  const content = formData.get('content')
  
  // Mutate data
  await db.insert(posts).values({ title, content })
  
  // Revalidate cache
  revalidatePath('/posts')
}
\`\`\`

### Why is this important?
1. **Less Boilerplate**: No need to create \`/api/posts/route.ts\`
2. **Type Safety**: End-to-end type safety without extra configuration
3. **Progressive Enhancement**: Forms work even before JavaScript loads

## Conclusion
The future of full-stack React is here, and it's incredibly productive. What are your thoughts on Server Actions? Let me know in the comments below!
`;

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;

  return (
    <div className="container max-w-3xl mx-auto py-8 px-4">
      <Link href="/blogs" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-200 transition-colors mb-8">
        <ArrowLeft size={16} /> Back to Blogs
      </Link>

      <article>
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {["nextjs", "react", "tutorial"].map(tag => (
              <span key={tag} className="text-xs text-indigo-400 font-medium">#{tag}</span>
            ))}
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 leading-tight">
            Getting Started with Next.js 14 and Server Actions
          </h1>

          <div className="flex items-center justify-between py-6 border-y border-zinc-800">
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alice" alt="Author" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-semibold">Alice Developer</div>
                <div className="text-sm text-zinc-400 flex items-center gap-2">
                  <span>Oct 24, 2023</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Clock size={14} /> 5 min read</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="hidden sm:flex rounded-full">Follow</Button>
            </div>
          </div>
        </div>

        {/* Cover Image */}
        <div className="aspect-video w-full rounded-xl overflow-hidden mb-10 border border-zinc-800">
          <img 
            src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200" 
            alt="Cover"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-between mb-8 py-2 sticky top-4 bg-background/80 backdrop-blur-md z-10 px-4 -mx-4 rounded-full border border-zinc-800 shadow-sm">
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-2 text-zinc-400 hover:text-red-400 transition-colors group">
              <Heart className="group-hover:fill-red-400 group-hover:text-red-400" />
              <span className="font-medium">128</span>
            </button>
            <button className="flex items-center gap-2 text-zinc-400 hover:text-indigo-400 transition-colors">
              <MessageSquare />
              <span className="font-medium">32</span>
            </button>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-zinc-400 hover:text-zinc-200 transition-colors"><BookmarkPlus /></button>
            <button className="text-zinc-400 hover:text-zinc-200 transition-colors"><Share2 /></button>
            <button className="text-zinc-400 hover:text-zinc-200 transition-colors"><MoreHorizontal /></button>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-indigo prose-lg max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
            {SAMPLE_CONTENT}
          </ReactMarkdown>
        </div>
      </article>

      {/* Comments Section */}
      <div className="mt-16 pt-8 border-t border-zinc-800">
        <h3 className="text-2xl font-bold mb-8">Comments (32)</h3>
        
        <div className="flex gap-4 mb-10">
          <Avatar>
             <AvatarFallback>ME</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <textarea 
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-4 outline-none focus:ring-2 ring-indigo-500 resize-none"
              placeholder="Add to the discussion..."
              rows={3}
            />
            <div className="mt-2 flex justify-end">
              <Button className="bg-indigo-600 hover:bg-indigo-700">Submit</Button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Sample Comment */}
          <div className="flex gap-4">
            <Avatar>
               <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Bob" />
               <AvatarFallback>BE</AvatarFallback>
            </Avatar>
            <div className="flex-1 bg-zinc-900 p-4 rounded-lg rounded-tl-none border border-zinc-800">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-sm">Bob Engineer</span>
                <span className="text-xs text-zinc-500">2 days ago</span>
              </div>
              <p className="text-zinc-300 text-sm">
                This is a game changer! I've been waiting for Server Actions to stabilize before migrating my team's project. The reduction in boilerplate alone makes it worth it.
              </p>
              <div className="mt-4 flex items-center gap-4 text-xs text-zinc-500 font-medium">
                <button className="hover:text-zinc-300 transition-colors">Like (12)</button>
                <button className="hover:text-zinc-300 transition-colors">Reply</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
