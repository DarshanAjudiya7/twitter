"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Hash, MessageSquare, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// Mock data until we connect to DB
const MOCK_CHANNELS = [
  { id: "general", name: "general" },
  { id: "frontend", name: "frontend" },
  { id: "backend", name: "backend" },
  { id: "ai", name: "ai" }
];

export function ChatSidebar() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-64 bg-zinc-950 text-zinc-300 flex flex-col h-full border-r border-zinc-800">
      <div className="p-4 flex items-center justify-between shadow-sm">
        <h2 className="font-bold text-lg text-white">Dev Community</h2>
      </div>
      <Separator className="bg-zinc-800" />
      
      <div className="flex-1 overflow-y-auto p-3 space-y-6">
        <div>
          <div className="flex items-center justify-between mb-2 px-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
            <span>Channels</span>
            <button className="hover:text-zinc-300"><Plus size={14} /></button>
          </div>
          <div className="space-y-1">
            {MOCK_CHANNELS.map((channel) => (
              <Link key={channel.id} href={`/chat/${channel.id}`}>
                <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-zinc-800/50 cursor-pointer text-sm transition-colors group">
                  <Hash size={18} className="text-zinc-500 group-hover:text-zinc-300" />
                  <span className="font-medium text-zinc-400 group-hover:text-zinc-200">{channel.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2 px-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
            <span>Direct Messages</span>
            <button className="hover:text-zinc-300"><Plus size={14} /></button>
          </div>
          <div className="space-y-1">
            {/* Mock DMs */}
            <Link href={`/chat/dm-1`}>
              <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-zinc-800/50 cursor-pointer text-sm transition-colors group">
                <MessageSquare size={16} className="text-zinc-500 group-hover:text-zinc-300" />
                <span className="font-medium text-zinc-400 group-hover:text-zinc-200">Jane Doe</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="p-3 bg-zinc-900 border-t border-zinc-800 mt-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-xs">
            ME
          </div>
          <div className="flex-1 min-w-0 text-sm">
            <div className="font-medium text-white truncate">My Username</div>
            <div className="text-xs text-zinc-500 truncate">Online</div>
          </div>
        </div>
      </div>
    </div>
  );
}
