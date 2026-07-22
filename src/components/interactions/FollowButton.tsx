"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toggleFollowAction } from "@/actions/interactions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface FollowButtonProps {
  followingId: string;
  initialFollowing: boolean;
  className?: string;
}

export function FollowButton({ followingId, initialFollowing, className }: FollowButtonProps) {
  const [isFollowing, setIsFollowing] = useState(initialFollowing);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleFollow = async () => {
    if (isLoading) return;
    setIsLoading(true);

    const res = await toggleFollowAction(followingId);
    
    if (res.success) {
      if (res.data?.action === "followed") {
        setIsFollowing(true);
        toast.success("Followed developer!");
      } else {
        setIsFollowing(false);
        toast.info("Unfollowed developer.");
      }
    } else if (res.error === "Unauthorized") {
      toast.error("You must be logged in to follow users.");
      router.push("/login");
    } else {
      toast.error(res.error || "Failed to toggle follow.");
    }
    
    setIsLoading(false);
  };

  return (
    <Button 
      variant={isFollowing ? "outline" : "default"}
      className={className || "rounded-full px-6 bg-indigo-600 hover:bg-indigo-700 text-white"}
      onClick={handleFollow}
      disabled={isLoading}
    >
      {isFollowing ? "Following" : "Follow"}
    </Button>
  );
}
