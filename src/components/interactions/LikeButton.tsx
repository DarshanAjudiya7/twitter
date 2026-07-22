"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { toggleLikeAction } from "@/actions/interactions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface LikeButtonProps {
  targetId: string;
  targetType: "blog" | "comment";
  initialCount: number;
  initialLiked: boolean;
}

export function LikeButton({ targetId, targetType, initialCount, initialLiked }: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLike = async () => {
    if (isLoading) return;
    setIsLoading(true);

    const res = await toggleLikeAction(targetId, targetType);
    
    if (res.success) {
      if (res.data?.action === "liked") {
        setIsLiked(true);
        setCount(c => c + 1);
        toast.success("Liked!");
      } else {
        setIsLiked(false);
        setCount(c => Math.max(0, c - 1));
        toast.info("Unliked.");
      }
    } else if (res.error === "Unauthorized") {
      toast.error("You must be logged in to like.");
      router.push("/login");
    } else {
      toast.error("Failed to toggle like.");
    }
    
    setIsLoading(false);
  };

  return (
    <button 
      onClick={handleLike}
      disabled={isLoading}
      className="flex items-center gap-2 text-zinc-400 hover:text-red-400 transition-colors group disabled:opacity-50"
    >
      <Heart 
        className={isLiked ? "fill-red-400 text-red-400" : "group-hover:fill-red-400 group-hover:text-red-400"} 
      />
      <span className={`font-medium ${isLiked ? 'text-red-400' : ''}`}>{count}</span>
    </button>
  );
}
