import { MessageSquare } from "lucide-react";

export default function ChatIndexPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-zinc-900 text-zinc-400">
      <MessageSquare size={48} className="mb-4 opacity-50" />
      <h2 className="text-xl font-semibold text-zinc-300">Welcome to the Developer Community</h2>
      <p className="mt-2 text-sm max-w-md text-center">
        Select a channel from the sidebar to start chatting with other developers, or start a new direct message.
      </p>
    </div>
  );
}
