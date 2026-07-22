# ⚡ Developer Community & Social Platform

A modern, full-stack **Developer Community Platform** built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4**, **Drizzle ORM**, **Socket.IO**, and **Better Auth**. Combining the best aspects of Discord, Dev.to, Reddit, and LinkedIn into a seamless developer hub.

---

## ✨ Features

### 💬 Real-Time Communication (Discord-like)
- **Public & Private Channels:** Organized chat rooms for Frontend, Backend, AI, DevOps, Career, etc.
- **Direct Messaging (DMs):** One-to-one developer messaging.
- **Socket.IO Real-Time Engine:** Ultra-low latency messaging, typing indicators, and online status.
- **Rich Media & Snippets:** Share code blocks, image attachments, and markdown messages.

### ✍️ Developer Blog System (Dev.to / Medium-inspired)
- **Interactive Markdown Editor:** Live preview with GFM syntax highlighting (`rehype-highlight` + `highlight.js`).
- **Publishing Workflow:** Draft saving, tag selection, cover image uploads, and reading time estimation.
- **Rich Blog Feed:** Filtering by Trending, Latest, Most Liked, and Bookmarks.
- **Discussion & Social:** Inline comment threads, nested replies, claps/likes, and article bookmarks.

### 👤 Developer Profiles & Social Graph
- **Rich Profiles:** Bio, skills, tech stack, experience, company info, and social links (GitHub, Twitter, LinkedIn).
- **Follow System:** Track activity and posts from your favorite developers.
- **Activity & Stats:** Total likes, post history, and follower analytics.

### 🔍 Command Palette & Global Search (`Cmd + K`)
- **Fast Keyboard Navigation:** Instantly search developers, channels, and technical articles across the platform using `cmdk`.

### 🏆 Gamification & Reputation
- **Reputation Score:** Earn points for publishing articles, receiving likes, writing helpful comments, and maintaining streaks.
- **Developer Badges:** Automatically unlock achievements (*Top Writer*, *Early Adopter*, *Community Leader*).

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router & Turbopack)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **Database & ORM:** [PostgreSQL](https://www.postgresql.org/) / [Neon](https://neon.tech/) with [Drizzle ORM](https://orm.drizzle.team/)
- **Authentication:** [Better Auth](https://www.better-auth.com/) (Email/Password, Email OTP, OAuth)
- **Real-Time Engine:** [Socket.IO](https://socket.io/) (Custom Node HTTP Integration)
- **Markdown & Code:** `react-markdown`, `remark-gfm`, `@tailwindcss/typography`
- **Icons:** `lucide-react` & `@tabler/icons-react`

---

## 🚀 Getting Started

### Prerequisites

Ensure you have Node.js 18+ and npm installed. You will also need a PostgreSQL database connection string (such as from Neon or Supabase).

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/DarshanAjudiya7/twitter.git
cd twitter
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/devcommunity"
BETTER_AUTH_SECRET="your-super-secret-key"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# (Optional) Social Auth Providers
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
```

### 3. Push Database Schema

Sync the Drizzle schema to your PostgreSQL database:

```bash
npx drizzle-kit push --force
```

### 4. Running the Development Server

#### Option A: Next.js Dev Server (Standard UI Development)
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

#### Option B: Full Real-Time Server (Recommended for Chat)
To run the full stack with **Socket.IO** real-time WebSocket support:

```bash
node server.js
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📂 Folder Structure Overview

```text
├── server.js               # Custom Node HTTP server wrapping Next.js + Socket.IO
├── drizzle.config.ts       # Drizzle ORM configuration
├── src/
│   ├── app/                # Next.js App Router pages
│   │   ├── (auth)/         # Login, signup, and authentication pages
│   │   ├── blogs/          # Blog feed, new post editor, and blog detail pages
│   │   ├── chat/           # Real-time Discord-style chat layout & routes
│   │   └── profile/        # Developer profile pages
│   ├── components/         # Reusable UI components
│   │   ├── blogs/          # Markdown editor & blog cards
│   │   ├── chat/           # Chat sidebar, message feed & socket handlers
│   │   ├── search/         # Cmd+K Command Palette
│   │   └── ui/             # Shadcn UI primitives & aceternity visual effects
│   ├── db/                 # Drizzle schema definitions & relations
│   ├── lib/                # Auth, email, and reputation gamification logic
│   └── server/             # Backend server utilities
└── public/                 # Static assets, images, and audio effects
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check out the issues page.

---

## 📝 License

Distributed under the MIT License.
