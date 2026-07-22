"use server";

import { db } from "@/index";
import * as schema from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

/** Helper to get the authenticated user */
async function getAuthUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session?.user?.id;
}

export async function addCommentAction(blogId: string, content: string) {
  const userId = await getAuthUser();
  if (!userId) return { success: false, error: "Unauthorized" };

  try {
    const [newComment] = await db
      .insert(schema.comments)
      .values({
        blogId,
        userId,
        content,
      })
      .returning();

    revalidatePath(`/blogs/[slug]`, "page");
    return { success: true, data: newComment };
  } catch (error) {
    console.error("Error adding comment:", error);
    return { success: false, error: "Failed to add comment" };
  }
}

export async function toggleLikeAction(targetId: string, targetType: "blog" | "comment") {
  const userId = await getAuthUser();
  if (!userId) return { success: false, error: "Unauthorized" };

  try {
    // Check if like exists
    const existingLike = await db
      .select()
      .from(schema.likes)
      .where(and(
        eq(schema.likes.userId, userId),
        eq(schema.likes.targetId, targetId),
        eq(schema.likes.targetType, targetType)
      ))
      .limit(1);

    if (existingLike.length > 0) {
      // Unlike
      await db
        .delete(schema.likes)
        .where(eq(schema.likes.id, existingLike[0].id));
      revalidatePath(`/blogs/[slug]`, "page");
      return { success: true, data: { action: "unliked" } };
    } else {
      // Like
      await db
        .insert(schema.likes)
        .values({
          userId,
          targetId,
          targetType,
        });
      revalidatePath(`/blogs/[slug]`, "page");
      return { success: true, data: { action: "liked" } };
    }
  } catch (error) {
    console.error("Error toggling like:", error);
    return { success: false, error: "Failed to toggle like" };
  }
}

export async function toggleFollowAction(followingId: string) {
  const followerId = await getAuthUser();
  if (!followerId) return { success: false, error: "Unauthorized" };
  if (followerId === followingId) return { success: false, error: "Cannot follow yourself" };

  try {
    const existingFollow = await db
      .select()
      .from(schema.follows)
      .where(and(
        eq(schema.follows.followerId, followerId),
        eq(schema.follows.followingId, followingId)
      ))
      .limit(1);

    if (existingFollow.length > 0) {
      // Unfollow
      await db
        .delete(schema.follows)
        .where(and(
          eq(schema.follows.followerId, followerId),
          eq(schema.follows.followingId, followingId)
        ));
      revalidatePath(`/profile/[username]`, "page");
      return { success: true, data: { action: "unfollowed" } };
    } else {
      // Follow
      await db
        .insert(schema.follows)
        .values({
          followerId,
          followingId,
        });
      revalidatePath(`/profile/[username]`, "page");
      return { success: true, data: { action: "followed" } };
    }
  } catch (error) {
    console.error("Error toggling follow:", error);
    return { success: false, error: "Failed to toggle follow" };
  }
}

export async function toggleCommunityJoinAction(communityId: string) {
  const userId = await getAuthUser();
  if (!userId) return { success: false, error: "Unauthorized" };

  try {
    const existingMember = await db
      .select()
      .from(schema.communityMembers)
      .where(and(
        eq(schema.communityMembers.communityId, communityId),
        eq(schema.communityMembers.userId, userId)
      ))
      .limit(1);

    if (existingMember.length > 0) {
      // Leave
      await db
        .delete(schema.communityMembers)
        .where(and(
          eq(schema.communityMembers.communityId, communityId),
          eq(schema.communityMembers.userId, userId)
        ));
      revalidatePath(`/communities`, "page");
      revalidatePath(`/communities/[slug]`, "page");
      return { success: true, data: { action: "left" } };
    } else {
      // Join
      await db
        .insert(schema.communityMembers)
        .values({
          communityId,
          userId,
          role: "member",
        });
      revalidatePath(`/communities`, "page");
      revalidatePath(`/communities/[slug]`, "page");
      return { success: true, data: { action: "joined" } };
    }
  } catch (error) {
    console.error("Error toggling community join:", error);
    return { success: false, error: "Failed to join/leave community" };
  }
}
