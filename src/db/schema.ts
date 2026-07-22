import { pgTable, text, timestamp, boolean, index, integer, varchar, primaryKey, jsonb } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  role: text("role").default("user").notNull(),
  lastLoginAt: timestamp("last_login_at"),
  
  // Developer Profile Fields
  bio: text("bio"),
  skills: text("skills").array(),
  socialLinks: jsonb("social_links"),
  experience: text("experience"),
  company: text("company"),
  techStack: text("tech_stack"),
  reputationScore: integer("reputation_score").default(0),
  
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [index("session_userId_idx").on(table.userId)],
);

export const account = pgTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [index("account_userId_idx").on(table.userId)],
);

export const verification = pgTable(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)],
);

export const tweetTable = pgTable("tweet", {
  tweetid: integer().primaryKey().generatedAlwaysAsIdentity(),
  desc: varchar({ length: 255 }).notNull(),
});

// Community features
export const follows = pgTable(
  "follows",
  {
    followerId: text("follower_id").notNull().references(() => user.id, { onDelete: "cascade" }),
    followingId: text("following_id").notNull().references(() => user.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.followerId, table.followingId] }),
    index("follower_idx").on(table.followerId),
    index("following_idx").on(table.followingId),
  ]
);

export const channels = pgTable("channels", {
  id: text("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name"), // can be null for DMs
  type: varchar("type", { length: 20 }).notNull(), // 'public', 'private', 'dm'
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()).notNull(),
});

export const channelMembers = pgTable(
  "channel_members",
  {
    channelId: text("channel_id").notNull().references(() => channels.id, { onDelete: "cascade" }),
    userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
    role: varchar("role", { length: 20 }).default("member").notNull(), // 'admin', 'member'
    joinedAt: timestamp("joined_at").defaultNow().notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.channelId, table.userId] }),
    index("cm_user_idx").on(table.userId),
  ]
);

export const messages = pgTable(
  "messages",
  {
    id: text("id").primaryKey().default(sql`gen_random_uuid()`),
    channelId: text("channel_id").notNull().references(() => channels.id, { onDelete: "cascade" }),
    senderId: text("sender_id").notNull().references(() => user.id, { onDelete: "cascade" }),
    content: text("content").notNull(),
    attachments: jsonb("attachments"),
    isEdited: boolean("is_edited").default(false),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()).notNull(),
  },
  (table) => [
    index("msg_channel_idx").on(table.channelId),
  ]
);

export const blogs = pgTable("blogs", {
  id: text("id").primaryKey().default(sql`gen_random_uuid()`),
  authorId: text("author_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(),
  coverImage: text("cover_image"),
  readTime: integer("read_time").default(0),
  status: varchar("status", { length: 20 }).default("draft").notNull(), // 'draft', 'published'
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()).notNull(),
});

export const tags = pgTable("tags", {
  id: text("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull().unique(),
});

export const blogTags = pgTable(
  "blog_tags",
  {
    blogId: text("blog_id").notNull().references(() => blogs.id, { onDelete: "cascade" }),
    tagId: text("tag_id").notNull().references(() => tags.id, { onDelete: "cascade" }),
  },
  (table) => [
    primaryKey({ columns: [table.blogId, table.tagId] })
  ]
);

export const comments = pgTable("comments", {
  id: text("id").primaryKey().default(sql`gen_random_uuid()`),
  blogId: text("blog_id").notNull().references(() => blogs.id, { onDelete: "cascade" }),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  parentId: text("parent_id"), // Self-referencing ID for replies
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()).notNull(),
});

export const likes = pgTable("likes", {
  id: text("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  targetType: varchar("target_type", { length: 20 }).notNull(), // 'blog' or 'comment'
  targetId: text("target_id").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const bookmarks = pgTable(
  "bookmarks",
  {
    userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
    blogId: text("blog_id").notNull().references(() => blogs.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.userId, table.blogId] })
  ]
);

export const notifications = pgTable("notifications", {
  id: text("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  actorId: text("actor_id").references(() => user.id, { onDelete: "set null" }), // User who triggered it
  type: varchar("type", { length: 30 }).notNull(), // 'like', 'comment', 'follow', 'mention', etc.
  message: text("message").notNull(),
  link: text("link"),
  isRead: boolean("is_read").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const communities = pgTable("communities", {
  id: text("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  category: varchar("category", { length: 50 }).notNull(),
  description: text("description"),
  icon: text("icon"),
  banner: text("banner"),
  announcement: text("announcement"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const communityMembers = pgTable(
  "community_members",
  {
    communityId: text("community_id").notNull().references(() => communities.id, { onDelete: "cascade" }),
    userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
    role: varchar("role", { length: 20 }).default("member").notNull(),
    joinedAt: timestamp("joined_at").defaultNow().notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.communityId, table.userId] })
  ]
);
