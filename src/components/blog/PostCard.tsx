import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { tagAccent, type AccentName } from "@/content";
import type { LoadedPost } from "@/content/types";
import { cn } from "@/lib/utils";

const ACCENT_CLASS: Record<AccentName, string> = {
  sky: "bg-accent-sky/20 text-accent-purple-deep",
  purple: "bg-accent-purple/40 text-accent-purple-deep",
  pink: "bg-accent-pink/20 text-accent-purple-deep",
  orange: "bg-accent-orange/15 text-accent-orange-deep",
  teal: "bg-accent-teal/15 text-accent-teal",
  green: "bg-accent-green/15 text-accent-green",
  brown: "bg-accent-brown/10 text-accent-brown",
};

export function PostCard({ post, primaryTag }: { post: LoadedPost; primaryTag?: string }) {
  const tag = primaryTag ?? post.tags[0] ?? "Post";
  const accent = ACCENT_CLASS[tagAccent(tag)];
  const initials =
    post.author?.name
      ?.split(/\s+/)
      .map((p) => p[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() ?? "—";

  return (
    <a
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col overflow-hidden rounded-xl bg-card transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_28px_-12px_rgba(0,0,0,0.18)]"
    >
      <div className="aspect-[16/10] overflow-hidden bg-canvas-soft">
        <img
          src={post.image}
          alt={post.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex items-center gap-3">
          <Badge
            variant="secondary"
            className={cn("rounded-md border-transparent px-2 py-0.5 text-[12px] font-semibold", accent)}
          >
            {tag}
          </Badge>
          {post.author && (
            <div className="flex items-center gap-2 text-[14px] text-ink-muted">
              <span>By</span>
              <Avatar className="h-5 w-5">
                {post.author.avatar && <AvatarImage src={post.author.avatar} alt={post.author.name} />}
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <span className="text-ink-secondary">{post.author.name}</span>
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <h3 className="text-[22px] font-bold leading-[1.27] tracking-[-0.25px] text-ink">
            {post.title}
          </h3>
          <p className="text-[15px] leading-[1.5] text-ink-muted">{post.subtitle}</p>
        </div>
        {post.date && (
          <div className="pt-2 text-[12px] font-semibold uppercase tracking-wider text-ink-faint">
            {new Date(post.date).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </div>
        )}
      </div>
    </a>
  );
}
