# DevCircle

DevCircle is a Developer Community Platform built with Next.js that combines the best features of Discord (real-time communication), Dev.to/Medium (publishing), Reddit (discussions), and LinkedIn (professional profiles).

## Features

- **Real-Time Communication**: Channels, direct messages, online status, and community announcements using real-time sync.
- **Publishing & Blogs**: Rich text publishing where developers can write technical tutorials, format code snippets, and manage drafts.
- **Professional Identity**: Developer profiles with skills, reputation tracking, followers, and social links.
- **Moderated Communities**: Topic hubs (e.g. Next.js, AI Builders, DevOps) where users can join, discuss, and track members dynamically.
- **Global Search**: Command palette (`CMD+K`) to instantly find developers, communities, blogs, and channels.
- **Authentication**: Fully integrated authentication utilizing Next.js Server Actions and PostgreSQL for data safety.
- **Modern UI**: Polished, dark-themed responsive UI using Tailwind CSS and Radix Primitives.

## Tech Stack

- **Framework**: Next.js 16 (App Router, Server Components, Server Actions, Turbopack)
- **Language**: TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Custom Next.js Auth wrappers / Better-Auth
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui, Radix UI, Lucide Icons, cmdk (for Command Palette)

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/devcircle.git
   cd devcircle
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add your connection strings:
   ```env
   DATABASE_URL=postgres://user:password@localhost:5432/devcircle
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Initialize database schemas:**
   ```bash
   npm run db:push
   # or
   npx drizzle-kit push
   ```

5. **Run the development server:**
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Architecture & Code Map

- `/src/actions`: Server Actions for database interaction (blogs, chat, communities, profile).
- `/src/app`: Next.js App Router routes (Auth, Chat, Blogs, Profile, Dashboard).
- `/src/components`: Shared React components.
- `/src/lib`: Utility functions, auth guard, database connection configs.
- `/src/schema`: Drizzle ORM schema definition (`schema.ts`).

## Contributing
Contributions, issues, and feature requests are welcome!

## License
MIT License
