"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { Button } from "@/components/ui/button";
import { Image as ImageIcon, Send, Eye, Edit2 } from "lucide-react";
import { createBlogAction } from "@/actions/blogs";
import { useRouter } from "next/navigation";
import "highlight.js/styles/github-dark.css";

import { toast } from "sonner";

export function MarkdownEditor() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [previewMode, setPreviewMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handlePublish = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error("Please provide both a title and content for your post.");
      return;
    }
    setIsSubmitting(true);
    const res = await createBlogAction({
      title,
      content,
      tags,
    });
    setIsSubmitting(false);

    if (res.success && res.data) {
      toast.success("Blog published successfully!");
      router.push(`/blogs/${res.data.slug}`);
    } else {
      toast.error("Failed to publish post.");
    }
  };

  return (
    <div className="flex flex-col flex-1 gap-4 overflow-hidden bg-background">
      <div className="flex items-center gap-4 shrink-0">
        <input
          type="text"
          placeholder="Post title here..."
          className="text-4xl font-bold bg-transparent border-none outline-none flex-1 placeholder:text-zinc-600 focus:ring-0 px-0"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-4 shrink-0">
         <input
          type="text"
          placeholder="Add up to 4 tags (comma separated)... e.g. react, nextjs, tutorial"
          className="bg-transparent border border-zinc-800 rounded-md outline-none flex-1 placeholder:text-zinc-600 focus:ring-1 focus:ring-indigo-500 px-3 py-2 text-sm"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-2 mb-2 shrink-0 bg-zinc-900 p-2 rounded-lg border border-zinc-800">
        <Button 
          variant={!previewMode ? "secondary" : "ghost"} 
          size="sm" 
          onClick={() => setPreviewMode(false)}
          className="gap-2"
        >
          <Edit2 size={16} /> Edit
        </Button>
        <Button 
          variant={previewMode ? "secondary" : "ghost"} 
          size="sm" 
          onClick={() => setPreviewMode(true)}
          className="gap-2"
        >
          <Eye size={16} /> Preview
        </Button>
        <div className="flex-1" />
        <Button variant="ghost" size="sm" className="gap-2">
          <ImageIcon size={16} /> Cover Image
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto border border-zinc-800 rounded-lg bg-zinc-950">
        {!previewMode ? (
          <textarea
            className="w-full h-full bg-transparent p-6 outline-none resize-none text-base font-mono leading-relaxed"
            placeholder="Write your post content here using Markdown..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        ) : (
          <div className="p-8 prose prose-invert prose-indigo max-w-none">
            {content ? (
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]} 
                rehypePlugins={[rehypeHighlight]}
              >
                {content}
              </ReactMarkdown>
            ) : (
              <p className="text-zinc-500 italic">Nothing to preview yet.</p>
            )}
          </div>
        )}
      </div>

      <div className="pt-4 flex justify-end gap-4 shrink-0">
        <Button variant="ghost">Save Draft</Button>
        <Button onClick={handlePublish} disabled={isSubmitting || !title || !content} className="gap-2 bg-indigo-600 hover:bg-indigo-700">
          <Send size={16} /> Publish
        </Button>
      </div>
    </div>
  );
}
