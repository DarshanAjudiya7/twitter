import Link from "next/link";
import { Clock, MessageSquare, Heart, BookmarkPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getBlogs } from "@/actions/blogs";

export default async function BlogsPage() {
  const res = await getBlogs();
  const blogList = res.data || [];

  return (
    <div className="container max-w-5xl mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Developer Blogs</h1>
          <p className="text-muted-foreground mt-2">Discover technical articles, tutorials, and insights from the community.</p>
        </div>
        <Link href="/blogs/new">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">Write a Post</Button>
        </Link>
      </div>

      <div className="flex gap-8">
        <div className="w-64 hidden md:block shrink-0 space-y-6">
          <div>
            <h3 className="font-semibold mb-3">Categories</h3>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li className="hover:text-indigo-400 cursor-pointer transition-colors font-medium text-white">🔥 Trending</li>
              <li className="hover:text-indigo-400 cursor-pointer transition-colors">✨ Latest</li>
              <li className="hover:text-indigo-400 cursor-pointer transition-colors">❤️ Most Liked</li>
              <li className="hover:text-indigo-400 cursor-pointer transition-colors">🔖 Bookmarks</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Popular Tags</h3>
            <div className="flex flex-wrap gap-2">
              {["nextjs", "react", "typescript", "tailwindcss", "backend", "ai"].map(tag => (
                <span key={tag} className="px-2 py-1 bg-zinc-800 text-zinc-300 text-xs rounded-md cursor-pointer hover:bg-zinc-700">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-8">
          {blogList.length === 0 ? (
            <div className="text-center py-12 bg-zinc-900/40 rounded-xl border border-zinc-800 text-zinc-500">
              No blogs published yet. Be the first to write a post!
            </div>
          ) : (
            blogList.map((blog) => (
              <div key={blog.id} className="group flex flex-col sm:flex-row gap-6 bg-zinc-900/50 p-4 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-colors">
                <div className="sm:w-1/3 aspect-video sm:aspect-square md:aspect-[4/3] rounded-lg overflow-hidden shrink-0">
                  <img 
                    src={blog.coverImage || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800"} 
                    alt={blog.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-zinc-400 mb-2">
                      <span className="font-medium text-zinc-300">{blog.authorName || "Anonymous"}</span>
                      <span>•</span>
                      <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                    </div>
                    <Link href={`/blogs/${blog.slug}`}>
                      <h2 className="text-xl font-bold mb-2 group-hover:text-indigo-400 transition-colors">
                        {blog.title}
                      </h2>
                    </Link>
                    <p className="text-sm text-zinc-400 line-clamp-2 mb-4">
                      {blog.content}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-zinc-800/50">
                    <div className="flex items-center gap-4 text-sm text-zinc-400">
                      <span className="flex items-center gap-1.5 hover:text-red-400 cursor-pointer transition-colors">
                        <Heart size={16} /> 42
                      </span>
                      <span className="flex items-center gap-1.5 hover:text-indigo-400 cursor-pointer transition-colors">
                        <MessageSquare size={16} /> 8
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-zinc-400">
                      <span className="flex items-center gap-1.5 hidden sm:flex">
                        <Clock size={16} /> {blog.readTime || 5} min read
                      </span>
                      <button className="hover:text-zinc-200 transition-colors" title="Bookmark">
                        <BookmarkPlus size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
