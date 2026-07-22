import { MapPin, Link as LinkIcon, Twitter, Github, Linkedin, Briefcase, Calendar, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

interface PageProps {
  params: Promise<{ username: string }>;
}

const MOCK_PROFILE = {
  username: "alicedev",
  name: "Alice Developer",
  bio: "Full-stack engineer passionate about React, Next.js, and open source. Building tools for the next generation of developers.",
  location: "San Francisco, CA",
  website: "https://alice.dev",
  twitter: "@alicedev",
  github: "alicedev",
  company: "Vercel",
  role: "Senior Frontend Engineer",
  joined: "January 2023",
  followers: 1240,
  following: 156,
  reputation: 4520,
  skills: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "TailwindCSS"],
  badges: [
    { name: "Top Writer 2023", icon: "🏆", color: "text-yellow-500 bg-yellow-500/10" },
    { name: "Early Adopter", icon: "🚀", color: "text-purple-500 bg-purple-500/10" },
    { name: "Helpful", icon: "🤝", color: "text-green-500 bg-green-500/10" }
  ]
};

export default async function ProfilePage({ params }: PageProps) {
  const { username } = await params;

  return (
    <div className="min-h-screen bg-background">
      {/* Cover Banner */}
      <div className="h-48 md:h-64 bg-gradient-to-r from-indigo-600 to-purple-600 w-full" />
      
      <div className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-24 sm:-mt-32 flex flex-col sm:flex-row gap-6 mb-8">
          <Avatar className="w-32 h-32 sm:w-40 sm:h-40 border-4 border-background shadow-xl">
            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`} alt={username} />
            <AvatarFallback className="text-4xl">{username.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 mt-4 sm:mt-32 flex flex-col sm:flex-row justify-between items-start gap-4">
            <div>
              <h1 className="text-3xl font-bold">{MOCK_PROFILE.name}</h1>
              <p className="text-zinc-400 font-medium text-lg">@{MOCK_PROFILE.username}</p>
              
              <div className="mt-4 flex flex-wrap gap-4 text-sm text-zinc-400">
                <span className="flex items-center gap-1.5"><MapPin size={16} /> {MOCK_PROFILE.location}</span>
                <span className="flex items-center gap-1.5"><Briefcase size={16} /> {MOCK_PROFILE.role} at {MOCK_PROFILE.company}</span>
                <span className="flex items-center gap-1.5"><Calendar size={16} /> Joined {MOCK_PROFILE.joined}</span>
              </div>
            </div>
            
            <div className="flex gap-3 w-full sm:w-auto">
              <Button className="flex-1 sm:flex-none bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-6">
                Follow
              </Button>
              <Button variant="outline" className="flex-1 sm:flex-none rounded-full px-6">
                Message
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12">
          {/* Left Column (Info) */}
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold mb-3">About</h2>
              <p className="text-zinc-300 leading-relaxed">{MOCK_PROFILE.bio}</p>
            </div>

            <div>
              <h3 className="font-semibold text-sm text-zinc-500 uppercase tracking-wider mb-4">Links</h3>
              <div className="space-y-3 text-sm font-medium">
                <a href={MOCK_PROFILE.website} target="_blank" className="flex items-center gap-3 text-zinc-300 hover:text-indigo-400 transition-colors">
                  <LinkIcon size={18} /> {MOCK_PROFILE.website.replace('https://', '')}
                </a>
                <a href="#" className="flex items-center gap-3 text-zinc-300 hover:text-indigo-400 transition-colors">
                  <Github size={18} /> {MOCK_PROFILE.github}
                </a>
                <a href="#" className="flex items-center gap-3 text-zinc-300 hover:text-indigo-400 transition-colors">
                  <Twitter size={18} /> {MOCK_PROFILE.twitter}
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-sm text-zinc-500 uppercase tracking-wider mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {MOCK_PROFILE.skills.map(skill => (
                  <span key={skill} className="px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-md text-sm text-zinc-300 font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (Content & Activity) */}
          <div className="md:col-span-2 space-y-8">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-white mb-1">{MOCK_PROFILE.followers}</div>
                <div className="text-xs text-zinc-500 uppercase font-semibold">Followers</div>
              </div>
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-white mb-1">{MOCK_PROFILE.following}</div>
                <div className="text-xs text-zinc-500 uppercase font-semibold">Following</div>
              </div>
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-indigo-400 mb-1">{MOCK_PROFILE.reputation}</div>
                <div className="text-xs text-zinc-500 uppercase font-semibold">Reputation</div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-sm text-zinc-500 uppercase tracking-wider mb-4">Badges</h3>
              <div className="flex gap-4">
                {MOCK_PROFILE.badges.map(badge => (
                  <div key={badge.name} className={\`\${badge.color} px-4 py-2 rounded-lg flex items-center gap-2 border border-current/20\`}>
                    <span className="text-lg">{badge.icon}</span>
                    <span className="font-medium text-sm">{badge.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-6">Recent Posts</h2>
              <div className="space-y-4">
                <div className="bg-zinc-900/30 p-4 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-colors">
                  <div className="text-xs text-zinc-500 mb-2">Oct 24, 2023</div>
                  <Link href="/blogs/getting-started-with-nextjs-14">
                    <h3 className="text-lg font-bold text-white mb-2 hover:text-indigo-400 transition-colors">Getting Started with Next.js 14 and Server Actions</h3>
                  </Link>
                  <p className="text-zinc-400 text-sm line-clamp-2">Learn how to build full-stack applications without writing a single API route using the new Server Actions in Next.js 14...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
