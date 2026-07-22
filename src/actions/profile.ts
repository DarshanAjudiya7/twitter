"use server";

import { db } from "@/index";
import * as schema from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export async function getUserProfile(idOrName: string) {
  try {
    const [foundUser] = await db
      .select()
      .from(schema.user)
      .where(eq(schema.user.id, idOrName))
      .limit(1);

    if (!foundUser) {
      // Fallback search by email prefix or return first user
      const [fallback] = await db.select().from(schema.user).limit(1);
      return { success: true, data: fallback || null };
    }

    return { success: true, data: foundUser };
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
