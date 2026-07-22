import Link from "next/link";
import { Trophy, Flame, Medal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getLeaderboardAction } from "@/actions/profile";

export default async function LeaderboardPage() {
  const res = await getLeaderboardAction();
  const leaderboard = res.data || [];

  return (
    <div className="container max-w-5xl mx-auto py-10 px-4">
      {/* Hero */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-4">
          <Trophy size={14} /> Weekly Leaderboard & Streaks
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight">Community Leaderboard</h1>
        <p className="text-zinc-400 mt-3 text-base">
          Earn XP points by publishing technical blogs, answering discussions, and helping fellow developers.
        </p>
      </div>

      {/* Full List */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden shadow-lg">
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
          <h3 className="font-bold text-base flex items-center gap-2">
            <Medal size={18} className="text-amber-400" /> Top Rankings (Database Live)
          </h3>
          <div className="flex gap-2">
            <Button size="sm" variant="secondary" className="text-xs">Weekly</Button>
          </div>
        </div>

        <div className="divide-y divide-zinc-800/60">
          {leaderboard.length === 0 ? (
            <div className="p-8 text-center text-zinc-500 text-sm">No leaderboard data found.</div>
          ) : (
            leaderboard.map((user, idx) => (
              <div key={user.id} className="p-4 flex items-center justify-between hover:bg-zinc-800/30 transition-colors">
                <div className="flex items-center gap-4">
                  <span className="w-6 text-center font-bold text-sm text-zinc-500">#{idx + 1}</span>
                  <Avatar className="w-10 h-10 border border-zinc-700">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} />
                    <AvatarFallback>{user.name?.substring(0, 2) || "U"}</AvatarFallback>
                  </Avatar>
                  <div>
                    <Link href={`/profile/${user.id}`}>
                      <h4 className="font-bold text-sm hover:text-indigo-400 transition-colors">{user.name}</h4>
                    </Link>
                    <p className="text-xs text-zinc-400">{user.company || user.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-xs font-medium">
                  <span className="flex items-center gap-1 text-orange-400">
                    <Flame size={14} /> 12d
                  </span>
                  <span className="font-bold text-indigo-400 text-sm">
                    {(user.reputationScore || 0).toLocaleString()} XP
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
