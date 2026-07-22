import { MapPin, Link as LinkIcon, Briefcase, Calendar } from "lucide-react";
import { IconBrandGithub, IconBrandTwitter } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUserProfile } from "@/actions/profile";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ username: string }>;
}

export default async function ProfilePage({ params }: PageProps) {
  const { username } = await params;
  const res = await getUserProfile(username);

  if (!res.success || !res.data) {
    notFound();
  }

  const profile = res.data;

  return (
    <div className="min-h-screen bg-background">
      {/* Cover Banner */}
      <div className="h-48 md:h-64 bg-gradient-to-r from-indigo-600 to-purple-600 w-full" />
      
      <div className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-24 sm:-mt-32 flex flex-col sm:flex-row gap-6 mb-8">
          <Avatar className="w-32 h-32 sm:w-40 sm:h-40 border-4 border-background shadow-xl">
            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.name}`} alt={profile.name} />
            <AvatarFallback className="text-4xl">{profile.name?.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 mt-4 sm:mt-32 flex flex-col sm:flex-row justify-between items-start gap-4">
            <div>
              <h1 className="text-3xl font-bold">{profile.name}</h1>
              <p className="text-zinc-400 font-medium text-lg">{profile.email}</p>
              
              <div className="mt-4 flex flex-wrap gap-4 text-sm text-zinc-400">
                <span className="flex items-center gap-1.5"><Briefcase size={16} /> {profile.experience || "Engineer"} at {profile.company || "Community"}</span>
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
              <p className="text-zinc-300 leading-relaxed">{profile.bio || "No bio provided yet."}</p>
            </div>

            <div>
              <h3 className="font-semibold text-sm text-zinc-500 uppercase tracking-wider mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {(profile.skills && profile.skills.length > 0 ? profile.skills : ["React", "TypeScript", "Next.js"]).map(skill => (
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
                <div className="text-2xl font-bold text-white mb-1">1.2k</div>
                <div className="text-xs text-zinc-500 uppercase font-semibold">Followers</div>
              </div>
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-white mb-1">156</div>
                <div className="text-xs text-zinc-500 uppercase font-semibold">Following</div>
              </div>
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-indigo-400 mb-1">{profile.reputationScore || 0}</div>
                <div className="text-xs text-zinc-500 uppercase font-semibold">Reputation</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
