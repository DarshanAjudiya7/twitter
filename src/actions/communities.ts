"use server";

import { db } from "@/index";
import * as schema from "@/db/schema";
import { eq, desc, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getCommunities() {
  try {
    const list = await db
      .select({
        id: schema.communities.id,
        name: schema.communities.name,
        slug: schema.communities.slug,
        category: schema.communities.category,
        description: schema.communities.description,
        icon: schema.communities.icon,
        banner: schema.communities.banner,
        announcement: schema.communities.announcement,
        createdAt: schema.communities.createdAt,
        memberCount: sql<number>`count(${schema.communityMembers.userId})::int`.as("memberCount"),
      })
      .from(schema.communities)
      .leftJoin(schema.communityMembers, eq(schema.communities.id, schema.communityMembers.communityId))
      .groupBy(schema.communities.id)
      .orderBy(desc(schema.communities.createdAt));

    return { success: true, data: list };
  } catch (error) {
    console.error("Error fetching communities:", error);
    return { success: false, data: [] };
  }
}

export async function getCommunityBySlug(slug: string) {
  try {
    const [community] = await db
      .select({
        id: schema.communities.id,
        name: schema.communities.name,
        slug: schema.communities.slug,
        category: schema.communities.category,
        description: schema.communities.description,
        icon: schema.communities.icon,
        banner: schema.communities.banner,
        announcement: schema.communities.announcement,
        createdAt: schema.communities.createdAt,
        memberCount: sql<number>`count(${schema.communityMembers.userId})::int`.as("memberCount"),
      })
      .from(schema.communities)
      .leftJoin(schema.communityMembers, eq(schema.communities.id, schema.communityMembers.communityId))
      .where(eq(schema.communities.slug, slug))
      .groupBy(schema.communities.id)
      .limit(1);

    return { success: true, data: community || null };
  } catch (error) {
    console.error("Error fetching community by slug:", error);
    return { success: false, data: null };
  }
}
