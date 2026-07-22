"use client";

import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { Search, FileText, User, Hash, Calculator } from "lucide-react";
import { useRouter } from "next/navigation";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // Toggle the menu when ⌘K is pressed
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-start justify-center pt-[15vh]">
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <Command label="Global Command Menu" shouldFilter={true} className="flex flex-col">
          <div className="flex items-center border-b border-zinc-800 px-3">
            <Search className="text-zinc-500 shrink-0" size={20} />
            <Command.Input 
              placeholder="Search developers, blogs, or channels..." 
              className="flex-1 bg-transparent text-white placeholder:text-zinc-500 px-3 py-4 outline-none border-none text-base font-medium"
              autoFocus
            />
            <button 
              onClick={() => setOpen(false)}
              className="text-xs bg-zinc-800 text-zinc-400 px-2 py-1 rounded-md cursor-pointer hover:bg-zinc-700 hover:text-zinc-200 transition-colors"
            >
              ESC
            </button>
          </div>

          <Command.List className="max-h-[300px] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-zinc-700">
            <Command.Empty className="py-6 text-center text-zinc-500 text-sm">
              No results found.
            </Command.Empty>

            <Command.Group heading="Blogs" className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:text-zinc-500 mb-2">
              <Command.Item 
                onSelect={() => { router.push('/blogs/getting-started-with-nextjs-14'); setOpen(false); }}
                className="flex items-center gap-3 px-3 py-2 text-sm text-zinc-300 rounded-lg cursor-pointer aria-selected:bg-indigo-600 aria-selected:text-white transition-colors"
              >
                <FileText size={16} />
                Getting Started with Next.js 14 and Server Actions
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Developers" className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:text-zinc-500 mb-2">
              <Command.Item 
                onSelect={() => { router.push('/profile/alicedev'); setOpen(false); }}
                className="flex items-center gap-3 px-3 py-2 text-sm text-zinc-300 rounded-lg cursor-pointer aria-selected:bg-indigo-600 aria-selected:text-white transition-colors"
              >
                <User size={16} />
                Alice Developer
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Channels" className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:text-zinc-500">
              <Command.Item 
                onSelect={() => { router.push('/chat/frontend'); setOpen(false); }}
                className="flex items-center gap-3 px-3 py-2 text-sm text-zinc-300 rounded-lg cursor-pointer aria-selected:bg-indigo-600 aria-selected:text-white transition-colors"
              >
                <Hash size={16} />
                frontend
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
}
