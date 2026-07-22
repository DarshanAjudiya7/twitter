import Link from "next/link";
import { Users, MessageSquare, Plus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCommunities } from "@/actions/communities";
import { JoinCommunityButton } from "@/components/interactions/JoinCommunityButton";

export default async function CommunitiesPage() {
  const res = await getCommunities();
  const communitiesList = res.data || [];

  return (
    <div className="container max-w-6xl mx-auto py-10 px-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-8 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm mb-2">
            <Sparkles size={16} /> Developer Guilds
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight">Explore Communities</h1>
          <p className="text-zinc-400 mt-2 max-w-xl">
            Join domain-specific developer guilds to ask questions, share tutorials, collaborate on projects, and network.
          </p>
        </div>

        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2 rounded-full px-6 self-start md:self-auto">
          <Plus size={18} /> Create Community
        </Button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {communitiesList.length === 0 ? (
          <div className="col-span-full text-center py-12 bg-zinc-900/40 rounded-xl border border-zinc-800 text-zinc-500">
            No communities created yet.
          </div>
        ) : (
          communitiesList.map((c) => (
            <div
              key={c.id}
              className="group bg-zinc-900/60 border border-zinc-800/80 rounded-2xl overflow-hidden hover:border-zinc-700 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Banner */}
                <div className="h-28 relative overflow-hidden">
                  <img
                    src={c.banner || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800"}
                    alt={c.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 to-transparent" />
                  <span className="absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full bg-zinc-900/80 text-zinc-300 backdrop-blur-md border border-zinc-700/50">
                    {c.category}
                  </span>
                </div>

                {/* Header Info */}
                <div className="p-5 pt-0 relative">
                  <div className="w-14 h-14 rounded-2xl bg-zinc-800 border-2 border-zinc-950 text-2xl flex items-center justify-center -mt-7 shadow-lg">
                    {c.icon || "🚀"}
                  </div>

                  <Link href={`/communities/${c.slug}`}>
                    <h2 className="text-xl font-bold mt-3 group-hover:text-indigo-400 transition-colors">
                      {c.name}
                    </h2>
                  </Link>

                  <p className="text-zinc-400 text-sm mt-2 line-clamp-2 leading-relaxed">
                    {c.description}
                  </p>
                </div>
              </div>

              {/* Footer Stats & Action */}
              <div className="px-5 pb-5 pt-3 border-t border-zinc-800/50 flex items-center justify-between mt-auto">
                <div className="flex items-center gap-4 text-xs text-zinc-400 font-medium">
                  <span className="flex items-center gap-1.5">
                    <Users size={14} className="text-indigo-400" />
                    {(c as any).memberCount || 0} members
                  </span>
                </div>

                <JoinCommunityButton 
                  communityId={c.id} 
                  initialJoined={false} 
                  className="rounded-full px-4 text-xs h-8 bg-indigo-600 hover:bg-indigo-700 text-white"
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
