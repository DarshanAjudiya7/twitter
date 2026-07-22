"use server";

import { db } from "@/index";
import * as schema from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getCommunities() {
  try {
    const list = await db.select().from(schema.communities).orderBy(desc(schema.communities.createdAt));
    return { success: true, data: list };
  } catch (error) {
    console.error("Error fetching communities:", error);
    return { success: false, data: [] };
  }
}

export async function getCommunityBySlug(slug: string) {
  try {
    const [community] = await db
      .select()
      .from(schema.communities)
      .where(eq(schema.communities.slug, slug))
      .limit(1);

    return { success: true, data: community || null };
  } catch (error) {
    console.error("Error fetching community by slug:", error);
    return { success: false, data: null };
  }
}
