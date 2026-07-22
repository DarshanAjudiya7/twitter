import { ChatArea } from "@/components/chat/ChatArea";

interface PageProps {
  params: Promise<{ channelId: string }>;
}

export default async function ChannelPage({ params }: PageProps) {
  const { channelId } = await params;
  return <ChatArea channelId={channelId} />;
}
