"use client";

import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { Eye, Clock, ThumbsUp, MessageSquare, TrendingUp, Users, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const VIEWS_DATA = [
  { name: "Mon", views: 2400, reads: 1800 },
  { name: "Tue", views: 3200, reads: 2400 },
  { name: "Wed", views: 4800, reads: 3600 },
  { name: "Thu", views: 3900, reads: 2900 },
  { name: "Fri", views: 6100, reads: 4800 },
  { name: "Sat", views: 7400, reads: 5900 },
  { name: "Sun", views: 8900, reads: 7100 },
];

const ENGAGEMENT_DATA = [
  { tag: "nextjs", engagement: 420 },
  { tag: "react", engagement: 380 },
  { tag: "ai", engagement: 590 },
  { tag: "devops", engagement: 210 },
  { tag: "typescript", engagement: 310 },
];

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("7d");

  return (
    <div className="container max-w-6xl mx-auto py-10 px-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-zinc-800">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Developer Analytics</h1>
          <p className="text-zinc-400 text-sm mt-1">Track post reads, engagement metrics, and community reach.</p>
        </div>

        <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 p-1 rounded-xl">
          <Button
            size="sm"
            variant={timeRange === "7d" ? "secondary" : "ghost"}
            onClick={() => setTimeRange("7d")}
            className="text-xs"
          >
            Last 7 Days
          </Button>
          <Button
            size="sm"
            variant={timeRange === "30d" ? "secondary" : "ghost"}
            onClick={() => setTimeRange("30d")}
            className="text-xs"
          >
            Last 30 Days
          </Button>
          <Button
            size="sm"
            variant={timeRange === "all" ? "secondary" : "ghost"}
            onClick={() => setTimeRange("all")}
            className="text-xs"
          >
            All Time
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <div className="bg-zinc-900/60 border border-zinc-800 p-5 rounded-2xl">
          <div className="flex items-center justify-between text-zinc-400 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Views</span>
            <Eye size={18} className="text-indigo-400" />
          </div>
          <div className="text-3xl font-bold text-white mb-1">36,700</div>
          <div className="flex items-center gap-1 text-xs font-medium text-emerald-400">
            <ArrowUpRight size={14} /> +14.2% from last week
          </div>
        </div>

        <div className="bg-zinc-900/60 border border-zinc-800 p-5 rounded-2xl">
          <div className="flex items-center justify-between text-zinc-400 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Reads</span>
            <Clock size={18} className="text-emerald-400" />
          </div>
          <div className="text-3xl font-bold text-white mb-1">28,500</div>
          <div className="flex items-center gap-1 text-xs font-medium text-emerald-400">
            <ArrowUpRight size={14} /> +18.6% read ratio
          </div>
        </div>

        <div className="bg-zinc-900/60 border border-zinc-800 p-5 rounded-2xl">
          <div className="flex items-center justify-between text-zinc-400 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Reactions & Likes</span>
            <ThumbsUp size={18} className="text-amber-400" />
          </div>
          <div className="text-3xl font-bold text-white mb-1">4,280</div>
          <div className="flex items-center gap-1 text-xs font-medium text-emerald-400">
            <ArrowUpRight size={14} /> +8.4% engagement
          </div>
        </div>

        <div className="bg-zinc-900/60 border border-zinc-800 p-5 rounded-2xl">
          <div className="flex items-center justify-between text-zinc-400 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Comments</span>
            <MessageSquare size={18} className="text-purple-400" />
          </div>
          <div className="text-3xl font-bold text-white mb-1">1,120</div>
          <div className="flex items-center gap-1 text-xs font-medium text-emerald-400">
            <ArrowUpRight size={14} /> +24 new discussions
          </div>
        </div>
      </div>

      {/* Chart 1: Views & Reads Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl">
          <h3 className="font-bold text-lg mb-6">Article Views vs Completed Reads</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={VIEWS_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorReads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis dataKey="name" stroke="#71717a" fontSize={12} />
                <YAxis stroke="#71717a" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: "#18181b", borderColor: "#27272a", borderRadius: "0.5rem" }} />
                <Area type="monotone" dataKey="views" stroke="#6366f1" fillOpacity={1} fill="url(#colorViews)" />
                <Area type="monotone" dataKey="reads" stroke="#10b981" fillOpacity={1} fill="url(#colorReads)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Top Performing Tags */}
        <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl">
          <h3 className="font-bold text-lg mb-6">Top Performing Tags</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ENGAGEMENT_DATA} layout="vertical" margin={{ top: 0, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis type="number" stroke="#71717a" fontSize={12} />
                <YAxis dataKey="tag" type="category" stroke="#71717a" fontSize={12} width={70} />
                <Tooltip contentStyle={{ backgroundColor: "#18181b", borderColor: "#27272a", borderRadius: "0.5rem" }} />
                <Bar dataKey="engagement" fill="#818cf8" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
