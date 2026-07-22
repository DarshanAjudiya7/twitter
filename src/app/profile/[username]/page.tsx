import Link from "next/link";
import { Award, Briefcase, Calendar, Globe, GraduationCap, Heart, MapPin, MessageCircle, Newspaper, ShieldCheck, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IconBrandGithub, IconBrandLinkedin, IconBrandTwitter } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { developers, getDeveloper, posts } from "@/data/community-platform";

interface PageProps {
  params: Promise<{ username: string }>;
}

const badges = [
  { name: "Top Writer", detail: "Monthly leaderboard", icon: Award, tone: "text-amber-300 border-amber-400/20 bg-amber-400/10" },
  { name: "Helpful Reviewer", detail: "100 accepted answers", icon: Heart, tone: "text-rose-300 border-rose-400/20 bg-rose-400/10" },
  { name: "Trusted Moderator", detail: "Community safety", icon: ShieldCheck, tone: "text-emerald-300 border-emerald-400/20 bg-emerald-400/10" },
];

export default async function ProfilePage({ params }: PageProps) {
  const { username } = await params;
  const profile = getDeveloper(username);
  const userPosts = posts.filter((post) => post.author.username === profile.username);
  const fallbackPosts = userPosts.length ? userPosts : posts.slice(0, 2);

  return (
    <main className="min-h-screen bg-[#08090d] pb-14 pt-20 text-zinc-100">
      <div className={`h-56 border-b border-white/10 ${profile.coverClass}`} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <section className="-mt-20 mb-8 grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
          <aside className="space-y-4">
            <div className="rounded-lg border border-white/10 bg-zinc-950/90 p-5 shadow-2xl shadow-black/30 backdrop-blur">
              <Avatar className="mb-4 size-32 border-4 border-zinc-950">
                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.avatarSeed}`} alt={profile.name} />
                <AvatarFallback>{profile.name.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <h1 className="text-3xl font-semibold text-white">{profile.name}</h1>
              <p className="mt-1 text-zinc-500">@{profile.username}</p>
              <p className="mt-4 text-sm leading-6 text-zinc-300">{profile.bio}</p>
              <div className="mt-5 flex gap-2">
                <Button className="flex-1 bg-sky-300 text-slate-950 hover:bg-sky-200">Follow</Button>
                <Button variant="outline" className="flex-1 border-white/15 bg-white/5 text-white hover:bg-white/10">
                  <MessageCircle /> Message
                </Button>
              </div>
            </div>

            <div className="rounded-lg border border-white/10 bg-zinc-950/80 p-4">
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-500">Profile</h2>
              <div className="space-y-3 text-sm text-zinc-400">
                <p className="flex items-center gap-2"><Briefcase className="size-4 text-zinc-600" /> {profile.role} at {profile.company}</p>
                <p className="flex items-center gap-2"><MapPin className="size-4 text-zinc-600" /> {profile.location}</p>
                <p className="flex items-center gap-2"><Calendar className="size-4 text-zinc-600" /> Joined {profile.joined}</p>
                <p className="flex items-center gap-2"><GraduationCap className="size-4 text-zinc-600" /> {profile.education}</p>
              </div>
            </div>

            <div className="rounded-lg border border-white/10 bg-zinc-950/80 p-4">
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-500">Links</h2>
              <div className="space-y-3 text-sm font-medium text-zinc-300">
                <a href={profile.website} className="flex items-center gap-2 hover:text-sky-200"><Globe className="size-4" /> {profile.website.replace("https://", "")}</a>
                <a href="#" className="flex items-center gap-2 hover:text-sky-200"><IconBrandGithub className="size-4" /> {profile.github}</a>
                <a href="#" className="flex items-center gap-2 hover:text-sky-200"><IconBrandLinkedin className="size-4" /> {profile.linkedin}</a>
                <a href="#" className="flex items-center gap-2 hover:text-sky-200"><IconBrandTwitter className="size-4" /> {profile.twitter}</a>
              </div>
            </div>
          </aside>

          <section className="space-y-6 lg:pt-24">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-lg border border-white/10 bg-zinc-950/80 p-4"><div className="text-2xl font-semibold text-white">{profile.followers.toLocaleString()}</div><div className="text-xs uppercase tracking-wide text-zinc-500">Followers</div></div>
              <div className="rounded-lg border border-white/10 bg-zinc-950/80 p-4"><div className="text-2xl font-semibold text-white">{profile.following.toLocaleString()}</div><div className="text-xs uppercase tracking-wide text-zinc-500">Following</div></div>
              <div className="rounded-lg border border-white/10 bg-zinc-950/80 p-4"><div className="text-2xl font-semibold text-sky-200">{profile.reputation}</div><div className="text-xs uppercase tracking-wide text-zinc-500">Reputation</div></div>
              <div className="rounded-lg border border-white/10 bg-zinc-950/80 p-4"><div className="text-2xl font-semibold text-emerald-200">{profile.level}</div><div className="text-xs uppercase tracking-wide text-zinc-500">Developer level</div></div>
            </div>

            <div className="rounded-lg border border-white/10 bg-zinc-950/80 p-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">Skills and tech stack</h2>
                <Badge variant="outline" className="border-sky-400/25 text-sky-200">Available for mentoring</Badge>
              </div>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill) => (
                  <Badge key={skill} variant="outline" className="border-white/10 bg-white/[0.03] text-zinc-300">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {badges.map((badge) => {
                const Icon = badge.icon;
                return (
                  <div key={badge.name} className={`rounded-lg border p-4 ${badge.tone}`}>
                    <Icon className="mb-3 size-5" />
                    <h3 className="font-semibold">{badge.name}</h3>
                    <p className="mt-1 text-xs opacity-80">{badge.detail}</p>
                  </div>
                );
              })}
            </div>

            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
              <div className="rounded-lg border border-white/10 bg-zinc-950/80">
                <div className="border-b border-white/10 p-4">
                  <h2 className="text-lg font-semibold text-white">Published work</h2>
                </div>
                <div className="divide-y divide-white/10">
                  {fallbackPosts.map((post) => (
                    <Link href={`/blogs/${post.slug}`} key={post.slug} className="block p-4 transition hover:bg-white/[0.03]">
                      <div className="mb-2 flex flex-wrap gap-2 text-xs text-zinc-500"><span>{post.date}</span><span>{post.readTime}</span><span>{post.views} reads</span></div>
                      <h3 className="font-semibold text-white">{post.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-zinc-400">{post.excerpt}</p>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-white/10 bg-zinc-950/80 p-4">
                <h2 className="mb-4 text-lg font-semibold text-white">Activity timeline</h2>
                <div className="space-y-4 text-sm text-zinc-400">
                  <p className="flex gap-2"><Newspaper className="mt-0.5 size-4 text-sky-300" /> Published a guide in Next.js</p>
                  <p className="flex gap-2"><Users className="mt-0.5 size-4 text-emerald-300" /> Joined AI Builders as a contributor</p>
                  <p className="flex gap-2"><Heart className="mt-0.5 size-4 text-rose-300" /> Received 240 claps this week</p>
                </div>
              </div>
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}


