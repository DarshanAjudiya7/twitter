"use client";

import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { BookOpen, Hash, Search, Users, UserRound, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { channels, communities, developers, posts } from "@/data/community-platform";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (event: KeyboardEvent) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((current) => !current);
      }
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const go = (href: string) => {
    router.push(href);
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center bg-black/60 px-4 pt-[12vh] backdrop-blur-sm">
      <div className="w-full max-w-2xl overflow-hidden rounded-lg border border-white/10 bg-zinc-950 shadow-2xl shadow-black/40">
        <Command label="Global Command Menu" shouldFilter className="flex flex-col">
          <div className="flex items-center border-b border-white/10 px-3">
            <Search className="size-5 shrink-0 text-zinc-500" />
            <Command.Input
              placeholder="Search developers, blogs, communities, channels..."
              className="flex-1 border-none bg-transparent px-3 py-4 text-base font-medium text-white outline-none placeholder:text-zinc-600"
              autoFocus
            />
            <button onClick={() => setOpen(false)} aria-label="Close command palette" className="rounded-md p-2 text-zinc-500 transition hover:bg-white/10 hover:text-white">
              <X className="size-4" />
            </button>
          </div>

          <Command.List className="max-h-[420px] overflow-y-auto p-2">
            <Command.Empty className="py-8 text-center text-sm text-zinc-500">No results found.</Command.Empty>

            <Command.Group heading="Blogs" className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wide [&_[cmdk-group-heading]]:text-zinc-500">
              {posts.map((post) => (
                <Command.Item key={post.slug} onSelect={() => go(`/blogs/${post.slug}`)} className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm text-zinc-300 transition aria-selected:bg-sky-400/10 aria-selected:text-white">
                  <BookOpen className="size-4" /> {post.title}
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Group heading="Developers" className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wide [&_[cmdk-group-heading]]:text-zinc-500">
              {developers.map((developer) => (
                <Command.Item key={developer.username} onSelect={() => go(`/profile/${developer.username}`)} className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm text-zinc-300 transition aria-selected:bg-sky-400/10 aria-selected:text-white">
                  <UserRound className="size-4" /> {developer.name}
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Group heading="Channels" className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wide [&_[cmdk-group-heading]]:text-zinc-500">
              {channels.map((channel) => (
                <Command.Item key={channel.id} onSelect={() => go(`/chat/${channel.id}`)} className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm text-zinc-300 transition aria-selected:bg-sky-400/10 aria-selected:text-white">
                  <Hash className="size-4" /> {channel.name}
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Group heading="Communities" className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wide [&_[cmdk-group-heading]]:text-zinc-500">
              {communities.map((community) => (
                <Command.Item key={community.slug} onSelect={() => go("/communities")} className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm text-zinc-300 transition aria-selected:bg-sky-400/10 aria-selected:text-white">
                  <Users className="size-4" /> {community.name}
                </Command.Item>
              ))}
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
}
