import {
  Bell,
  BookOpen,
  Code2,
  Hash,
  MessageCircle,
  ShieldCheck,
  Trophy,
  Users,
} from "lucide-react";

export const platformStats = [
  { label: "active developers", value: "24.8K" },
  { label: "weekly discussions", value: "8.2K" },
  { label: "published guides", value: "3.9K" },
  { label: "community answers", value: "18.4K" },
];

export const featurePillars = [
  {
    title: "Real-time collaboration",
    description:
      "Channels, direct messages, typing indicators, read status, pinned context, file sharing, and code-aware conversations.",
    icon: MessageCircle,
    tone: "text-sky-300 bg-sky-400/10 border-sky-400/20",
  },
  {
    title: "Publishing workspace",
    description:
      "Markdown posts, rich technical tutorials, drafts, scheduled publishing, tags, series, SEO fields, reactions, and nested comments.",
    icon: BookOpen,
    tone: "text-emerald-300 bg-emerald-400/10 border-emerald-400/20",
  },
  {
    title: "Professional identity",
    description:
      "Developer profiles with skills, projects, GitHub links, reputation, badges, followers, activity, and community contribution history.",
    icon: Code2,
    tone: "text-amber-300 bg-amber-400/10 border-amber-400/20",
  },
  {
    title: "Moderated communities",
    description:
      "Topic hubs with admins, moderators, announcements, reports, audit trails, role permissions, and trust and safety controls.",
    icon: ShieldCheck,
    tone: "text-rose-300 bg-rose-400/10 border-rose-400/20",
  },
];

export const communities = [
  {
    slug: "nextjs",
    name: "Next.js",
    description: "Server Components, App Router, caching, deployments, and production architecture.",
    members: "18.2K",
    online: 842,
    posts: 128,
    accent: "border-white/15 bg-white/5",
    tags: ["react", "rsc", "vercel"],
  },
  {
    slug: "ai-builders",
    name: "AI Builders",
    description: "Agents, evals, vector search, multimodal apps, and reliable AI product patterns.",
    members: "14.7K",
    online: 621,
    posts: 94,
    accent: "border-cyan-400/20 bg-cyan-400/10",
    tags: ["agents", "llms", "evals"],
  },
  {
    slug: "devops",
    name: "DevOps",
    description: "CI/CD, observability, containers, platform engineering, and incident response.",
    members: "9.6K",
    online: 388,
    posts: 73,
    accent: "border-lime-400/20 bg-lime-400/10",
    tags: ["docker", "k8s", "sre"],
  },
  {
    slug: "python",
    name: "Python",
    description: "APIs, data systems, automation, testing, typing, and clean Python services.",
    members: "22.4K",
    online: 910,
    posts: 152,
    accent: "border-yellow-400/20 bg-yellow-400/10",
    tags: ["fastapi", "data", "typing"],
  },
];

export const developers = [
  {
    username: "alicedev",
    name: "Alice Developer",
    role: "Senior Frontend Engineer",
    company: "Vercel",
    location: "San Francisco, CA",
    status: "Reviewing RSC cache boundaries",
    bio: "Full-stack engineer building fast developer tools with React, Next.js, TypeScript, and distributed systems.",
    skills: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS"],
    followers: 12400,
    following: 312,
    reads: "186K",
    likes: "32K",
    reputation: 4520,
    level: "Level 18",
    joined: "January 2023",
    github: "alicedev",
    linkedin: "alice-developer",
    twitter: "@alicedev",
    website: "https://alice.dev",
    portfolio: "https://alice.dev/projects",
    education: "B.S. Computer Science, UC Berkeley",
    avatarSeed: "Alice",
    coverClass: "bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.35),transparent_28%),linear-gradient(135deg,#0f172a,#064e3b_48%,#422006)]",
  },
  {
    username: "mayak",
    name: "Maya Kapoor",
    role: "AI Platform Lead",
    company: "Northstar Labs",
    location: "Bengaluru, India",
    status: "Shipping an eval harness",
    bio: "AI engineer focused on trustworthy agents, retrieval systems, and production ML workflows.",
    skills: ["Python", "Agents", "Evals", "FastAPI", "Postgres", "Vector Search"],
    followers: 9800,
    following: 221,
    reads: "142K",
    likes: "28K",
    reputation: 3985,
    level: "Level 16",
    joined: "May 2024",
    github: "mayak",
    linkedin: "maya-kapoor-ai",
    twitter: "@mayakbuilds",
    website: "https://maya.dev",
    portfolio: "https://maya.dev/labs",
    education: "M.Tech Artificial Intelligence, IISc",
    avatarSeed: "Maya",
    coverClass: "bg-[radial-gradient(circle_at_80%_10%,rgba(34,211,238,0.3),transparent_25%),linear-gradient(135deg,#111827,#164e63_52%,#312e81)]",
  },
  {
    username: "samops",
    name: "Sam Rivera",
    role: "Staff Platform Engineer",
    company: "Railway",
    location: "Austin, TX",
    status: "Writing an incident review",
    bio: "Platform engineer making deploys calmer with observability, containers, and resilient infrastructure.",
    skills: ["Go", "Kubernetes", "Terraform", "OpenTelemetry", "Postgres", "SRE"],
    followers: 7300,
    following: 184,
    reads: "91K",
    likes: "14K",
    reputation: 3170,
    level: "Level 14",
    joined: "September 2023",
    github: "samops",
    linkedin: "sam-rivera-platform",
    twitter: "@samops",
    website: "https://samops.dev",
    portfolio: "https://samops.dev/runbooks",
    education: "B.S. Software Engineering, UT Austin",
    avatarSeed: "Sam",
    coverClass: "bg-[radial-gradient(circle_at_25%_10%,rgba(163,230,53,0.25),transparent_24%),linear-gradient(135deg,#111827,#365314_48%,#1e293b)]",
  },
];

export const posts = [
  {
    slug: "next-16-cache-playbook",
    title: "A field guide to cache boundaries in Next.js 16",
    excerpt:
      "How to decide what belongs in a Server Component, where to stream data, and how to avoid accidental stale UI in large apps.",
    author: developers[0],
    date: "Jul 18, 2026",
    readTime: "9 min read",
    likes: 1420,
    comments: 86,
    claps: 6800,
    views: "42K",
    tags: ["nextjs", "react", "performance"],
    community: "Next.js",
    featured: true,
    cover:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1200",
  },
  {
    slug: "agent-evals-before-launch",
    title: "The eval checklist I use before launching an AI agent",
    excerpt:
      "A practical review system for regression suites, scenario coverage, refusal behavior, tool safety, and production monitoring.",
    author: developers[1],
    date: "Jul 15, 2026",
    readTime: "11 min read",
    likes: 988,
    comments: 64,
    claps: 5100,
    views: "31K",
    tags: ["ai", "agents", "testing"],
    community: "AI Builders",
    featured: true,
    cover:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=1200",
  },
  {
    slug: "incident-response-for-small-teams",
    title: "Incident response for teams that do not have a dedicated SRE group",
    excerpt:
      "Runbooks, ownership, alerts, customer updates, and postmortems that scale down without becoming theater.",
    author: developers[2],
    date: "Jul 10, 2026",
    readTime: "7 min read",
    likes: 732,
    comments: 41,
    claps: 2900,
    views: "18K",
    tags: ["devops", "sre", "observability"],
    community: "DevOps",
    featured: false,
    cover:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
  },
];

export const discussions = [
  {
    title: "How are you handling optimistic updates with server actions?",
    channel: "frontend",
    replies: 42,
    votes: 186,
    lastActive: "4 min ago",
    author: "alicedev",
  },
  {
    title: "Share your favorite lightweight observability stack",
    channel: "devops",
    replies: 28,
    votes: 119,
    lastActive: "12 min ago",
    author: "samops",
  },
  {
    title: "Best way to evaluate multi-step tool-calling agents?",
    channel: "ai",
    replies: 35,
    votes: 154,
    lastActive: "18 min ago",
    author: "mayak",
  },
];

export const channels = [
  { id: "general", name: "general", unread: 12, kind: "Public", members: 24800 },
  { id: "frontend", name: "frontend", unread: 5, kind: "Public", members: 12900 },
  { id: "backend", name: "backend", unread: 2, kind: "Public", members: 10300 },
  { id: "ai", name: "ai-builders", unread: 9, kind: "Invite", members: 14700 },
  { id: "announcements", name: "announcements", unread: 1, kind: "Read-only", members: 24800 },
];

export const directMessages = [
  { id: "dm-alice", name: "Alice Developer", status: "online", unread: 2 },
  { id: "dm-maya", name: "Maya Kapoor", status: "typing", unread: 1 },
  { id: "dm-sam", name: "Sam Rivera", status: "away", unread: 0 },
];

export const notifications = [
  { text: "Maya mentioned you in AI Builders", time: "2m" },
  { text: "Alice published a new Next.js guide", time: "18m" },
  { text: "Sam replied to your incident response comment", time: "44m" },
  { text: "You earned the Helpful Reviewer badge", time: "2h" },
];

export const roadmap = [
  { label: "Messaging", status: "Live", icon: MessageCircle },
  { label: "Publishing", status: "Live", icon: BookOpen },
  { label: "Communities", status: "Live", icon: Hash },
  { label: "Notifications", status: "Live", icon: Bell },
  { label: "Gamification", status: "Beta", icon: Trophy },
  { label: "Moderation", status: "Beta", icon: ShieldCheck },
  { label: "Profiles", status: "Live", icon: Users },
];

export function getPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug) ?? posts[0];
}

export function getDeveloper(username: string) {
  return developers.find((developer) => developer.username === username) ?? developers[0];
}
