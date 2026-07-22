"use server";

import { db } from "@/index";
import * as schema from "@/db/schema";
import { eq, desc } from "drizzle-orm";

import { sql } from "drizzle-orm";

export async function getUserProfile(idOrName: string) {
  try {
    const [foundUser] = await db
      .select()
      .from(schema.user)
      .where(eq(schema.user.id, idOrName))
      .limit(1);

    const userToReturn = foundUser || (await db.select().from(schema.user).limit(1))[0];
    if (!userToReturn) return { success: true, data: null };

    // Fetch counts
    const [followersResult] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(schema.follows)
      .where(eq(schema.follows.followingId, userToReturn.id));

    const [followingResult] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(schema.follows)
      .where(eq(schema.follows.followerId, userToReturn.id));

    return { 
      success: true, 
      data: { 
        ...userToReturn, 
        followersCount: followersResult.count || 0,
        followingCount: followingResult.count || 0
      } 
    };
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return { success: false, data: null };
  }
}

export async function getLeaderboardAction() {
  try {
    const topUsers = await db
      .select({
        id: schema.user.id,
        name: schema.user.name,
        email: schema.user.email,
        bio: schema.user.bio,
        company: schema.user.company,
        reputationScore: schema.user.reputationScore,
      })
      .from(schema.user)
      .orderBy(desc(schema.user.reputationScore))
      .limit(10);

    return { success: true, data: topUsers };
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return { success: false, data: [] };
  }
}
