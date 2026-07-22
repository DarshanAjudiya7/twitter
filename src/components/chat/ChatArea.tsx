"use client";

import { useEffect, useState, useRef } from "react";
import io, { Socket } from "socket.io-client";
import { Send, Image as ImageIcon, Smile, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
}

export function ChatArea({ channelId }: { channelId: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const socketRef = useRef<Socket | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Connect to local Socket.IO server
    // For this to work seamlessly with our custom server.js, it's on the same port
    socketRef.current = io(window.location.origin, {
      reconnection: false, // Don't loop network errors if server.js isn't running
      timeout: 2000,
      transports: ["websocket"] // Force WebSocket to prevent unhandled fetch NetworkErrors during polling
    });
    
    const socket = socketRef.current;

    socket.on("connect", () => {
      console.log("Connected to socket server");
      socket.emit("join_channel", channelId);
    });

    socket.on("connect_error", (err) => {
      console.warn("Socket.IO connection failed. Make sure you are running 'node server.js' instead of 'npm run dev'.", err.message);
    });

    socket.on("new_message", (data: Message) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.emit("leave_channel", channelId);
      socket.disconnect();
    };
  }, [channelId]);

  useEffect(() => {
    // Scroll to bottom when messages change
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || !socketRef.current) return;

    const newMessage = {
      id: Math.random().toString(36).substring(7),
      channelId,
      sender: "Me", // Mock user
      content: inputValue,
      timestamp: new Date(),
    };

    socketRef.current.emit("send_message", newMessage);
    setInputValue("");
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-zinc-900 text-zinc-100">
      {/* Header */}
      <div className="h-14 border-b border-zinc-800 flex items-center px-6 shadow-sm z-10 shrink-0">
        <h3 className="font-bold text-lg"># {channelId}</h3>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-zinc-500">
            <p>Welcome to #{channelId}!</p>
            <p className="text-sm">Be the first to say hello.</p>
          </div>
        ) : (
          messages.map((msg, i) => (
            <div key={i} className="flex gap-4 group">
              <div className="w-10 h-10 rounded-full bg-indigo-500 shrink-0 flex items-center justify-center font-bold">
                {msg.sender.charAt(0)}
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="font-bold hover:underline cursor-pointer">{msg.sender}</span>
                  <span className="text-xs text-zinc-500">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <div className="text-zinc-300 mt-1 whitespace-pre-wrap break-words">
                  {msg.content}
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-zinc-900 shrink-0">
        <form onSubmit={handleSendMessage} className="bg-zinc-800 rounded-lg flex items-end p-2 border border-zinc-700 focus-within:ring-2 ring-indigo-500 transition-shadow">
          <div className="flex gap-2 p-2 shrink-0 text-zinc-400">
            <button type="button" className="hover:text-zinc-200 transition-colors"><PlusCircle size={20} /></button>
          </div>
          
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(e);
              }
            }}
            placeholder={`Message #${channelId}`}
            className="flex-1 bg-transparent border-none outline-none resize-none max-h-32 min-h-[44px] py-3 px-2 text-sm text-zinc-100 placeholder:text-zinc-500"
            rows={1}
          />
          
          <div className="flex gap-2 p-2 shrink-0">
            <button type="button" className="text-zinc-400 hover:text-zinc-200 transition-colors"><Smile size={20} /></button>
            <button type="submit" disabled={!inputValue.trim()} className="text-indigo-400 hover:text-indigo-300 disabled:opacity-50 disabled:hover:text-indigo-400 transition-colors">
              <Send size={20} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Inline fallback for missing lucide-react PlusCircle just in case
const PlusCircle = ({ size }: { size: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>
);
