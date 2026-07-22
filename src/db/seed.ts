import 'dotenv/config';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(process.env.DATABASE_URL!);

async function seed() {
  console.log("🌱 Starting database seed...");

  try {
    // 1. Seed Demo Users
    console.log("Seeding users...");
    const [alice] = await db.insert(schema.user).values({
      id: "usr_alice",
      name: "Alice Developer",
      email: "alice@example.com",
      bio: "Full-stack engineer passionate about React, Next.js, and open source.",
      company: "Vercel",
      experience: "Senior Frontend Engineer",
      skills: ["React", "Next.js", "TypeScript", "PostgreSQL"],
      techStack: "Next.js, Drizzle, TailwindCSS",
      reputationScore: 4520,
    }).onConflictDoNothing().returning();

    const [bob] = await db.insert(schema.user).values({
      id: "usr_bob",
      name: "Bob Engineer",
      email: "bob@example.com",
      bio: "Backend architect and cloud enthusiast. Building scalable microservices.",
      company: "AWS",
      experience: "Staff Backend Engineer",
      skills: ["Go", "Node.js", "Docker", "Kubernetes"],
      techStack: "Go, PostgreSQL, AWS",
      reputationScore: 3210,
    }).onConflictDoNothing().returning();

    // 2. Seed Channels
    console.log("Seeding channels...");
    await db.insert(schema.channels).values([
      { id: "general", name: "general", type: "public", description: "General community chat" },
      { id: "frontend", name: "frontend", type: "public", description: "Frontend development discussions" },
      { id: "backend", name: "backend", type: "public", description: "Backend & database design" },
      { id: "ai", name: "ai", type: "public", description: "Artificial Intelligence & LLMs" },
    ]).onConflictDoNothing();

    // 3. Seed Communities
    console.log("Seeding communities...");
    await db.insert(schema.communities).values([
      {
        slug: "react",
        name: "React Developers",
        category: "Frontend",
        description: "The official hub for React.js, React Native, ecosystem news, state management, and component architecture.",
        icon: "⚛️",
        banner: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800",
        announcement: "React 19 Candidate Release is live! Check out the compiler updates and Server Action hooks.",
      },
      {
        slug: "nextjs",
        name: "Next.js Universe",
        category: "Fullstack",
        description: "Everything Next.js App Router, Server Actions, Turbopack, performance optimization, and Vercel ecosystem.",
        icon: "▲",
        banner: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
        announcement: "Next.js 16 is now out! Explore the new App Router performance features.",
      },
      {
        slug: "ai-ml",
        name: "AI & Machine Learning",
        category: "AI",
        description: "LLMs, LangChain, OpenAI, PyTorch, PySpark, neural networks, computer vision, and AI agent engineering.",
        icon: "🤖",
        banner: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
      },
    ]).onConflictDoNothing();

    // 4. Seed Blogs
    console.log("Seeding blogs...");
    const authorId = alice?.id || "usr_alice";
    await db.insert(schema.blogs).values([
      {
        id: "blog_1",
        authorId,
        title: "Getting Started with Next.js 14 and Server Actions",
        slug: "getting-started-with-nextjs-14",
        content: "Learn how to build full-stack applications without writing a single API route using the new Server Actions in Next.js...",
        coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
        readTime: 5,
        status: "published",
      },
      {
        id: "blog_2",
        authorId: bob?.id || "usr_bob",
        title: "Understanding React Server Components (RSC)",
        slug: "understanding-react-server-components",
        content: "A deep dive into how RSCs work under the hood and why they are a game changer for React performance and architecture.",
        coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800",
        readTime: 8,
        status: "published",
      },
    ]).onConflictDoNothing();

    console.log("✅ Database seed complete!");
  } catch (error) {
    console.error("❌ Database seed failed:", error);
  }
}

seed();
