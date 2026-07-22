import Link from "next/link";
import { Trophy, Flame, Award, Star, TrendingUp, Zap, Medal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const MOCK_LEADERBOARD = [
  {
    rank: 1,
    name: "Alice Developer",
    username: "alicedev",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
    xp: 12450,
    level: 42,
    streak: 28,
    badge: "🥇 Top Writer",
    contributions: 184,
  },
  {
    rank: 2,
    name: "Bob Engineer",
    username: "bobengine",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
    xp: 9820,
    level: 35,
    streak: 19,
    badge: "🥈 Community Leader",
    contributions: 142,
  },
  {
    rank: 3,
    name: "Charlie Code",
    username: "charlie_c",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie",
    xp: 8400,
    level: 29,
    streak: 14,
    badge: "🥉 Active Contributor",
    contributions: 98,
  },
  {
    rank: 4,
    name: "Diana Prince",
    username: "diana_tech",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Diana",
    xp: 7210,
    level: 26,
    streak: 9,
    badge: "🚀 Rising Star",
    contributions: 76,
  },
  {
    rank: 5,
    name: "Ethan Hunt",
    username: "ethan_dev",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ethan",
    xp: 6150,
    level: 22,
    streak: 7,
    badge: "💡 Problem Solver",
    contributions: 64,
  },
];

export default function LeaderboardPage() {
  return (
    <div className="container max-w-5xl mx-auto py-10 px-4">
      {/* Hero */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-4">
          <Trophy size={14} /> Weekly Leaderboard & Streaks
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight">Community Leaderboard</h1>
        <p className="text-zinc-400 mt-3 text-base">
          Earn XP points by publishing technical blogs, answering discussions, and helping fellow developers. Maintain your daily streak to unlock exclusive badges!
        </p>
      </div>

      {/* Top 3 Podiums */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Rank 2 */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 flex flex-col items-center text-center relative order-2 md:order-1 mt-0 md:mt-6">
          <span className="absolute -top-3 bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs font-bold px-3 py-0.5 rounded-full">
            #2 Second Place
          </span>
          <Avatar className="w-20 h-20 border-2 border-zinc-400 shadow-lg mt-2 mb-4">
            <AvatarImage src={MOCK_LEADERBOARD[1].avatar} />
            <AvatarFallback>BE</AvatarFallback>
          </Avatar>
          <h3 className="font-bold text-lg">{MOCK_LEADERBOARD[1].name}</h3>
          <p className="text-xs text-zinc-400">@{MOCK_LEADERBOARD[1].username}</p>
          <div className="mt-4 flex items-center gap-3 text-xs font-semibold">
            <span className="text-indigo-400">{MOCK_LEADERBOARD[1].xp} XP</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-amber-400">
              <Flame size={14} /> {MOCK_LEADERBOARD[1].streak}d streak
            </span>
          </div>
        </div>

        {/* Rank 1 */}
        <div className="bg-gradient-to-b from-indigo-950/50 to-zinc-900/80 border-2 border-amber-500/40 rounded-2xl p-6 flex flex-col items-center text-center relative order-1 md:order-2 shadow-2xl scale-105">
          <span className="absolute -top-3 bg-amber-500 text-zinc-950 text-xs font-extrabold px-4 py-0.5 rounded-full flex items-center gap-1 shadow-md">
            <Trophy size={14} /> #1 Champion
          </span>
          <Avatar className="w-24 h-24 border-4 border-amber-500 shadow-amber-500/20 shadow-xl mt-2 mb-4">
            <AvatarImage src={MOCK_LEADERBOARD[0].avatar} />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          <h3 className="font-bold text-xl text-white">{MOCK_LEADERBOARD[0].name}</h3>
          <p className="text-xs text-zinc-400">@{MOCK_LEADERBOARD[0].username}</p>
          <div className="mt-4 flex items-center gap-3 text-xs font-bold">
            <span className="text-amber-400 text-sm">{MOCK_LEADERBOARD[0].xp} XP</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-orange-400 text-sm">
              <Flame size={16} /> {MOCK_LEADERBOARD[0].streak}d streak
            </span>
          </div>
        </div>

        {/* Rank 3 */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 flex flex-col items-center text-center relative order-3 mt-0 md:mt-6">
          <span className="absolute -top-3 bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs font-bold px-3 py-0.5 rounded-full">
            #3 Third Place
          </span>
          <Avatar className="w-20 h-20 border-2 border-amber-700 shadow-lg mt-2 mb-4">
            <AvatarImage src={MOCK_LEADERBOARD[2].avatar} />
            <AvatarFallback>CC</AvatarFallback>
          </Avatar>
          <h3 className="font-bold text-lg">{MOCK_LEADERBOARD[2].name}</h3>
          <p className="text-xs text-zinc-400">@{MOCK_LEADERBOARD[2].username}</p>
          <div className="mt-4 flex items-center gap-3 text-xs font-semibold">
            <span className="text-indigo-400">{MOCK_LEADERBOARD[2].xp} XP</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-amber-400">
              <Flame size={14} /> {MOCK_LEADERBOARD[2].streak}d streak
            </span>
          </div>
        </div>
      </div>

      {/* Full List */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden shadow-lg">
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
          <h3 className="font-bold text-base flex items-center gap-2">
            <Medal size={18} className="text-amber-400" /> Top Rankings
          </h3>
          <div className="flex gap-2">
            <Button size="sm" variant="secondary" className="text-xs">Weekly</Button>
            <Button size="sm" variant="ghost" className="text-xs text-zinc-400">Monthly</Button>
            <Button size="sm" variant="ghost" className="text-xs text-zinc-400">All-Time</Button>
          </div>
        </div>

        <div className="divide-y divide-zinc-800/60">
          {MOCK_LEADERBOARD.map((user) => (
            <div key={user.username} className="p-4 flex items-center justify-between hover:bg-zinc-800/30 transition-colors">
              <div className="flex items-center gap-4">
                <span className="w-6 text-center font-bold text-sm text-zinc-500">#{user.rank}</span>
                <Avatar className="w-10 h-10 border border-zinc-700">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <Link href={`/profile/${user.username}`}>
                    <h4 className="font-bold text-sm hover:text-indigo-400 transition-colors">{user.name}</h4>
                  </Link>
                  <p className="text-xs text-zinc-400">@{user.username} • Level {user.level}</p>
                </div>
              </div>

              <div className="flex items-center gap-6 text-xs font-medium">
                <span className="hidden sm:inline bg-zinc-800 px-3 py-1 rounded-full text-zinc-300">
                  {user.badge}
                </span>
                <span className="flex items-center gap-1 text-orange-400">
                  <Flame size={14} /> {user.streak}d
                </span>
                <span className="font-bold text-indigo-400 text-sm">
                  {user.xp.toLocaleString()} XP
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
