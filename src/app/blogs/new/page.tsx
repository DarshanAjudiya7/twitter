import { MarkdownEditor } from "@/components/blogs/MarkdownEditor";
import { requireAuth } from "@/lib/auth-guard";

export default async function NewBlogPage() {
  await requireAuth();

  return (
    <div className="container max-w-5xl mx-auto py-8 px-4 h-screen flex flex-col">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Create a New Post</h1>
        <p className="text-muted-foreground mt-2">Share your knowledge with the developer community.</p>
      </div>
      <MarkdownEditor />
    </div>
  );
}
