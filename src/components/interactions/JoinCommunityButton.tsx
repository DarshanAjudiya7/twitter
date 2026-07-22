"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toggleCommunityJoinAction } from "@/actions/interactions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface JoinCommunityButtonProps {
  communityId: string;
  initialJoined: boolean;
  className?: string;
}

export function JoinCommunityButton({ communityId, initialJoined, className }: JoinCommunityButtonProps) {
  const [isJoined, setIsJoined] = useState(initialJoined);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleJoin = async () => {
    if (isLoading) return;
    setIsLoading(true);

    const res = await toggleCommunityJoinAction(communityId);
    
    if (res.success) {
      if (res.data?.action === "joined") {
        setIsJoined(true);
        toast.success("Joined community!");
      } else {
        setIsJoined(false);
        toast.info("Left community.");
      }
    } else if (res.error === "Unauthorized") {
      toast.error("You must be logged in to join communities.");
      router.push("/login");
    } else {
      toast.error(res.error || "Failed to join community.");
    }
    
    setIsLoading(false);
  };

  return (
    <Button 
      variant={isJoined ? "outline" : "default"}
      className={className || "rounded-full px-6 bg-indigo-600 hover:bg-indigo-700 text-white"}
      onClick={handleJoin}
      disabled={isLoading}
    >
      {isJoined ? "Joined" : "Join"}
    </Button>
  );
}
