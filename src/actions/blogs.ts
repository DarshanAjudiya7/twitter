"use server";

import { db } from "@/index";
import * as schema from "@/db/schema";
import { eq, desc, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getBlogs() {
  try {
    const blogList = await db
      .select({
        id: schema.blogs.id,
        title: schema.blogs.title,
        slug: schema.blogs.slug,
        content: schema.blogs.content,
        coverImage: schema.blogs.coverImage,
        readTime: schema.blogs.readTime,
        status: schema.blogs.status,
        createdAt: schema.blogs.createdAt,
        authorName: schema.user.name,
        authorId: schema.user.id,
      })
      .from(schema.blogs)
      .leftJoin(schema.user, eq(schema.blogs.authorId, schema.user.id))
      .where(eq(schema.blogs.status, "published"))
      .orderBy(desc(schema.blogs.createdAt));

    return { success: true, data: blogList };
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return { success: false, data: [] };
  }
}

export async function getBlogBySlug(slug: string) {
  try {
    const [blog] = await db
      .select({
        id: schema.blogs.id,
        title: schema.blogs.title,
        slug: schema.blogs.slug,
        content: schema.blogs.content,
        coverImage: schema.blogs.coverImage,
        readTime: schema.blogs.readTime,
        status: schema.blogs.status,
        createdAt: schema.blogs.createdAt,
        authorName: schema.user.name,
        authorId: schema.user.id,
        authorBio: schema.user.bio,
      })
      .from(schema.blogs)
      .leftJoin(schema.user, eq(schema.blogs.authorId, schema.user.id))
      .where(eq(schema.blogs.slug, slug))
      .limit(1);

    if (!blog) return { success: false, data: null };

    // Fetch comments
    const commentsList = await db
      .select({
        id: schema.comments.id,
        content: schema.comments.content,
        createdAt: schema.comments.createdAt,
        userName: schema.user.name,
        userId: schema.user.id,
      })
      .from(schema.comments)
      .leftJoin(schema.user, eq(schema.comments.userId, schema.user.id))
      .where(eq(schema.comments.blogId, blog.id))
      .orderBy(desc(schema.comments.createdAt));

    return { success: true, data: { ...blog, comments: commentsList } };
  } catch (error) {
    console.error("Error fetching blog by slug:", error);
    return { success: false, data: null };
  }
}

export async function createBlogAction(formData: {
  title: string;
  content: string;
  tags?: string;
  coverImage?: string;
}) {
  try {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "") + "-" + Math.random().toString(36).substring(2, 6);

    const [newBlog] = await db
      .insert(schema.blogs)
      .values({
        authorId: "usr_alice", // Default active demo user
        title: formData.title,
        slug,
        content: formData.content,
        coverImage: formData.coverImage || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
        readTime: Math.ceil(formData.content.split(" ").length / 200),
        status: "published",
      })
      .returning();

    revalidatePath("/blogs");
    return { success: true, data: newBlog };
  } catch (error) {
    console.error("Error creating blog:", error);
    return { success: false, error: "Failed to publish blog" };
  }
}
