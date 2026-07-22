import Link from "next/link";
import { ArrowLeft, Users, MessageSquare, ShieldCheck, Pin, ThumbsUp, MessageCircle, Share2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const MOCK_COMMUNITY_DATA: Record<string, any> = {
  react: {
    name: "React Developers",
    slug: "react",
    icon: "⚛️",
    banner: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=1200",
    description: "The official hub for React.js, React Native, ecosystem news, state management, and component architecture.",
    members: 14250,
    online: 342,
    rules: [
      "Keep posts relevant to React and ecosystem.",
      "Be respectful and collaborative.",
      "Format code snippets cleanly with syntax highlighting.",
      "No spam or self-promotion without context."
    ],
    announcement: "React 19 Candidate Release is live! Check out the compiler updates and Server Action hooks.",
    discussions: [
      {
        id: 1,
        author: "Dan Abramov",
        username: "dan_abramov",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dan",
        title: "How React Compiler changes the game for useMemo and useCallback",
        content: "With the new React Compiler auto-memoizing components, developers no longer need to manually manage dependency arrays in 95% of cases...",
        likes: 342,
        comments: 56,
        time: "4 hours ago",
        tag: "Discussion"
      },
      {
        id: 2,
        author: "Sophie Alpert",
        username: "sophie_a",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie",
        title: "Best patterns for global state management in 2026",
        content: "Comparing Zustand vs Jotai vs React Context for large enterprise applications with server components...",
        likes: 189,
        comments: 28,
        time: "1 day ago",
        tag: "Tutorial"
      }
    ]
  }
};

export default async function CommunityDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const community = MOCK_COMMUNITY_DATA[slug] || {
    name: slug.toUpperCase() + " Guild",
    slug,
    icon: "🚀",
    banner: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200",
    description: "A community for tech enthusiasts and software engineers.",
    members: 5400,
    online: 120,
    rules: ["Be respectful", "Share knowledge"],
    announcement: "Welcome to the community!",
    discussions: []
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Banner */}
      <div className="h-56 relative overflow-hidden">
        <img src={community.banner} alt={community.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
      </div>

      <div className="container max-w-6xl mx-auto px-4 relative -mt-16 pb-16">
        <Link href="/communities" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-200 transition-colors mb-6">
          <ArrowLeft size={16} /> All Communities
        </Link>

        {/* Header Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-zinc-900/90 border border-zinc-800 p-6 rounded-2xl backdrop-blur-xl mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-zinc-800 border-2 border-zinc-700 text-3xl flex items-center justify-center shrink-0">
              {community.icon}
            </div>
            <div>
              <h1 className="text-2xl font-extrabold flex items-center gap-2">
                {community.name}
                <ShieldCheck className="text-indigo-400 shrink-0" size={20} />
              </h1>
              <p className="text-zinc-400 text-sm mt-1">{community.description}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-zinc-800 pt-4 md:pt-0">
            <div className="text-xs text-zinc-400">
              <span className="font-bold text-white text-base block">{community.members.toLocaleString()}</span>
              Members ({community.online} online)
            </div>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-6">
              Joined
            </Button>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            {/* Announcement Banner */}
            {community.announcement && (
              <div className="bg-gradient-to-r from-indigo-950/60 to-purple-950/60 border border-indigo-500/30 p-4 rounded-xl flex items-start gap-3">
                <Pin className="text-indigo-400 shrink-0 mt-0.5" size={18} />
                <div>
                  <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider block mb-1">Community Announcement</span>
                  <p className="text-sm text-zinc-200">{community.announcement}</p>
                </div>
              </div>
            )}

            {/* Create Post Action */}
            <div className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-xl flex items-center gap-3">
              <Avatar className="w-9 h-9">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Me" />
                <AvatarFallback>ME</AvatarFallback>
              </Avatar>
              <input
                type="text"
                placeholder="Start a discussion in this community..."
                className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-sm outline-none focus:border-indigo-500"
              />
              <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white">Post</Button>
            </div>

            {/* Discussions */}
            <div className="space-y-4">
              {community.discussions.map((d: any) => (
                <div key={d.id} className="bg-zinc-900/40 border border-zinc-800/80 p-5 rounded-xl hover:border-zinc-700 transition-colors">
                  <div className="flex items-center justify-between text-xs text-zinc-400 mb-3">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={d.avatar} />
                        <AvatarFallback>{d.author.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <span className="font-semibold text-zinc-200">{d.author}</span>
                      <span>•</span>
                      <span>{d.time}</span>
                    </div>
                    <span className="bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded font-medium">{d.tag}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 hover:text-indigo-400 cursor-pointer transition-colors">
                    {d.title}
                  </h3>
                  <p className="text-zinc-400 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {d.content}
                  </p>

                  <div className="flex items-center gap-6 text-xs text-zinc-400 border-t border-zinc-800/60 pt-3">
                    <button className="flex items-center gap-1.5 hover:text-indigo-400 transition-colors font-medium">
                      <ThumbsUp size={14} /> {d.likes} Upvotes
                    </button>
                    <button className="flex items-center gap-1.5 hover:text-indigo-400 transition-colors font-medium">
                      <MessageCircle size={14} /> {d.comments} Comments
                    </button>
                    <button className="flex items-center gap-1.5 hover:text-zinc-300 transition-colors ml-auto">
                      <Share2 size={14} /> Share
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Rules */}
            <div className="bg-zinc-900/50 border border-zinc-800 p-5 rounded-xl">
              <h3 className="font-bold text-base mb-4 flex items-center gap-2">
                <ShieldCheck size={18} className="text-indigo-400" /> Community Rules
              </h3>
              <ol className="space-y-3 text-xs text-zinc-300 list-decimal list-inside">
                {community.rules.map((rule: string, i: number) => (
                  <li key={i} className="leading-relaxed">{rule}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
