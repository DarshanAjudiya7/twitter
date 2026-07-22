"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { AtSign, Bookmark, Code2, FileText, Forward, Image as ImageIcon, MoreHorizontal, Paperclip, Pin, Search, Send, Smile, ShieldAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ReportModal } from "@/components/moderation/ReportModal";

interface Message {
  id: string;
  sender: string;
  role: string;
  content: string;
  timestamp: string;
  status: "read" | "delivered" | "sending";
  reactions: string[];
  code?: string;
  replyTo?: string;
}

const seededMessages: Message[] = [
  {
    id: "1",
    sender: "Alice Developer",
    role: "Senior Frontend Engineer",
    content: "Pinned context: we are collecting production patterns for optimistic UI, cache invalidation, and message delivery state.",
    timestamp: "09:42",
    status: "read",
    reactions: ["👍 8", "🚀 5"],
  },
  {
    id: "2",
    sender: "Maya Kapoor",
    role: "AI Platform Lead",
    content: "This shape worked well for us: persist the event first, broadcast over Socket.IO, then let clients reconcile local optimistic records by id.",
    timestamp: "09:48",
    status: "read",
    reactions: ["❤️ 12", "🔥 4"],
    code: "socket.emit('message:create', optimisticMessage);\nserver.broadcast(roomId, savedMessage);",
  },
  {
    id: "3",
    sender: "Sam Rivera",
    role: "Staff Platform Engineer",
    content: "Also worth tracking delivered/read separately. It makes incident debugging much easier when WebSocket reconnects are involved.",
    timestamp: "09:55",
    status: "delivered",
    reactions: ["💡 3"],
    replyTo: "Maya Kapoor",
  },
];

export function ChatArea({ channelId }: { channelId: string }) {
  const [messages, setMessages] = useState<Message[]>(seededMessages);
  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [typing, setTyping] = useState("Maya is typing...");
  const [reportTargetId, setReportTargetId] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const timer = window.setTimeout(() => setTyping(""), 3500);
    return () => window.clearTimeout(timer);
  }, [channelId]);

  const handleSendMessage = (event: FormEvent) => {
    event.preventDefault();
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: crypto.randomUUID(),
      sender: "Me",
      role: "Product Builder",
      content: inputValue.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      status: "sending",
      reactions: [],
    };

    setMessages((current) => [...current, newMessage]);
    setInputValue("");
    window.setTimeout(() => {
      setMessages((current) => current.map((message) => message.id === newMessage.id ? { ...message, status: "delivered" } : message));
    }, 600);
  };

  const handleAddReaction = (messageId: string, emoji: string) => {
    setMessages(current => current.map(m => {
      if (m.id === messageId) {
        return { ...m, reactions: [...m.reactions, `${emoji} 1`] };
      }
      return m;
    }));
  };

  const filteredMessages = messages.filter(m => 
    !searchQuery || m.content.toLowerCase().includes(searchQuery.toLowerCase()) || m.sender.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-full flex-1 flex-col bg-[#08090d] text-zinc-100 relative">
      <header className="flex min-h-16 items-center justify-between border-b border-white/10 bg-zinc-950/90 px-4 backdrop-blur sm:px-6">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="truncate text-lg font-semibold text-white">#{channelId}</h1>
            <Badge variant="outline" className="border-emerald-400/20 bg-emerald-400/10 text-emerald-200">842 online</Badge>
          </div>
          <p className="truncate text-xs text-zinc-500">Public channel with pins, reactions, replies, files, read receipts, and code snippets.</p>
        </div>
        <div className="flex items-center gap-2 text-zinc-400">
          <button 
            onClick={() => setIsSearchOpen(!isSearchOpen)} 
            aria-label="Search messages" 
            className={`rounded-md p-2 transition hover:bg-white/10 hover:text-white ${isSearchOpen ? "bg-white/10 text-white" : ""}`}
          >
            <Search className="size-4" />
          </button>
          <button aria-label="Pinned messages" className="rounded-md p-2 transition hover:bg-white/10 hover:text-white"><Pin className="size-4" /></button>
        </div>
      </header>

      {/* Message Search Sub-bar */}
      {isSearchOpen && (
        <div className="bg-zinc-900 border-b border-white/10 p-2 px-4 flex items-center gap-2">
          <Search size={14} className="text-zinc-500" />
          <input
            type="text"
            placeholder="Search messages in this channel..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-xs text-white outline-none placeholder:text-zinc-500"
            autoFocus
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="text-xs text-zinc-500 hover:text-zinc-300">Clear</button>
          )}
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
        <div className="mx-auto max-w-4xl space-y-5">
          <div className="rounded-lg border border-amber-400/20 bg-amber-400/10 p-4 text-sm text-amber-100">
            <div className="mb-1 flex items-center gap-2 font-semibold"><Pin className="size-4" /> Pinned announcement</div>
            Weekly challenge: share one production lesson with a code snippet. Top answers earn reputation and a community badge.
          </div>

          {filteredMessages.map((message) => (
            <article key={message.id} className="group rounded-lg border border-white/10 bg-zinc-950/75 p-4 transition hover:border-white/20">
              {message.replyTo ? <div className="mb-3 text-xs text-zinc-500">Replying to {message.replyTo}</div> : null}
              <div className="flex gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-white/10 font-semibold text-white">
                  {message.sender.slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-white">{message.sender}</span>
                    <span className="text-xs text-zinc-600">{message.role}</span>
                    <span className="text-xs text-zinc-600">{message.timestamp}</span>
                    <span className="text-xs capitalize text-sky-300">{message.status}</span>
                  </div>
                  <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-6 text-zinc-300">{message.content}</p>
                  {message.code ? (
                    <pre className="mt-3 overflow-x-auto rounded-md border border-white/10 bg-black/40 p-3 text-xs text-emerald-200"><code>{message.code}</code></pre>
                  ) : null}
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    {message.reactions.map((reaction) => (
                      <Badge key={reaction} variant="outline" className="border-white/10 bg-white/[0.04] text-zinc-300">{reaction}</Badge>
                    ))}
                    <div className="flex gap-1 items-center bg-white/[0.03] p-1 rounded-full border border-white/10 text-xs">
                      {["👍", "❤️", "🚀", "🔥"].map(emoji => (
                        <button key={emoji} onClick={() => handleAddReaction(message.id, emoji)} className="hover:scale-125 transition-transform px-1">
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="hidden gap-1 text-zinc-500 group-hover:flex">
                  <button onClick={() => setReportTargetId(message.id)} aria-label="Report message" className="rounded-md p-1.5 hover:bg-red-500/20 hover:text-red-400" title="Report">
                    <ShieldAlert className="size-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
          <div ref={bottomRef} />
        </div>
      </div>

      <footer className="border-t border-white/10 bg-zinc-950/90 p-4">
        <div className="mx-auto max-w-4xl">
          {typing ? <p className="mb-2 text-xs text-sky-300">{typing}</p> : null}
          <form onSubmit={handleSendMessage} className="rounded-lg border border-white/10 bg-black/30 p-2 focus-within:ring-2 focus-within:ring-sky-400/40">
            <textarea
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  handleSendMessage(event);
                }
              }}
              placeholder={`Message #${channelId}`}
              className="min-h-16 w-full resize-none bg-transparent px-2 py-2 text-sm text-zinc-100 outline-none placeholder:text-zinc-600"
              rows={2}
            />
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-2">
              <div className="flex items-center gap-1 text-zinc-500">
                <button type="button" aria-label="Attach file" className="rounded-md p-2 hover:bg-white/10 hover:text-white"><Paperclip className="size-4" /></button>
                <button type="button" aria-label="Attach image" className="rounded-md p-2 hover:bg-white/10 hover:text-white"><ImageIcon className="size-4" /></button>
                <button type="button" aria-label="Insert code" className="rounded-md p-2 hover:bg-white/10 hover:text-white"><Code2 className="size-4" /></button>
                <button type="button" aria-label="Emoji" className="rounded-md p-2 hover:bg-white/10 hover:text-white"><Smile className="size-4" /></button>
              </div>
              <Button type="submit" disabled={!inputValue.trim()} className="bg-sky-300 text-slate-950 hover:bg-sky-200">
                <Send /> Send
              </Button>
            </div>
          </form>
        </div>
      </footer>

      {/* Moderation Report Modal */}
      <ReportModal
        isOpen={!!reportTargetId}
        onClose={() => setReportTargetId(null)}
        targetId={reportTargetId || ""}
        targetType="message"
      />
    </div>
  );
}

