"use server";

import { db } from "@/index";
import * as schema from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getChannels() {
  try {
    const list = await db.select().from(schema.channels);
    return { success: true, data: list };
  } catch (error) {
    console.error("Error fetching channels:", error);
    return { success: false, data: [] };
  }
}

export async function getChannelMessages(channelId: string) {
  try {
    const msgList = await db
      .select({
        id: schema.messages.id,
        content: schema.messages.content,
        createdAt: schema.messages.createdAt,
        senderId: schema.messages.senderId,
        senderName: schema.user.name,
      })
      .from(schema.messages)
      .leftJoin(schema.user, eq(schema.messages.senderId, schema.user.id))
      .where(eq(schema.messages.channelId, channelId))
      .orderBy(desc(schema.messages.createdAt))
      .limit(50);

    return { success: true, data: msgList.reverse() };
  } catch (error) {
    console.error("Error fetching channel messages:", error);
    return { success: false, data: [] };
  }
}

export async function createMessageAction(channelId: string, content: string) {
  try {
    const [msg] = await db
      .insert(schema.messages)
      .values({
        channelId,
        senderId: "usr_alice",
        content,
      })
      .returning();

    revalidatePath(`/chat/${channelId}`);
    return { success: true, data: msg };
  } catch (error) {
    console.error("Error posting message:", error);
    return { success: false, error: "Failed to send message" };
  }
}
