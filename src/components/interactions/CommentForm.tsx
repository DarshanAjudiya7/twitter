"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { addCommentAction } from "@/actions/interactions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function CommentForm({ blogId }: { blogId: string }) {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!content.trim()) return;

    setIsSubmitting(true);
    const res = await addCommentAction(blogId, content);
    setIsSubmitting(false);

    if (res.success) {
      toast.success("Comment added!");
      setContent("");
      router.refresh(); // Refresh page to see new comment
    } else if (res.error === "Unauthorized") {
      toast.error("You must be logged in to comment.");
      router.push("/login");
    } else {
      toast.error("Failed to add comment.");
    }
  };

  return (
    <div className="flex gap-4 mb-10">
      <Avatar>
         <AvatarFallback>ME</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <textarea 
          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-4 outline-none focus:ring-2 ring-indigo-500 resize-none text-sm"
          placeholder="Add to the discussion..."
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={isSubmitting}
        />
        <div className="mt-2 flex justify-end">
          <Button 
            className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50" 
            onClick={handleSubmit}
            disabled={isSubmitting || !content.trim()}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </div>
    </div>
  );
}
