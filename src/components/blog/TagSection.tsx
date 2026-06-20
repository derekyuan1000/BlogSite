import { PostCard } from "./PostCard";
import { tagSlug } from "@/content";
import type { LoadedPost } from "@/content/types";

export function TagSection({
  tag,
  posts,
  id,
}: {
  tag: string;
  posts: LoadedPost[];
  id?: string;
}) {
  return (
    <section id={id ?? tagSlug(tag)} className="mx-auto max-w-6xl px-6 py-12 scroll-mt-24">
      <div className="mb-8 flex items-end justify-between border-b border-hairline pb-4">
        <h2 className="text-[26px] font-bold leading-[1.23] tracking-[-0.625px] text-ink">
          {tag}
        </h2>
        <span className="text-[14px] text-ink-muted">
          {posts.length} {posts.length === 1 ? "article" : "articles"}
        </span>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <PostCard key={`${tag}-${p.slug}`} post={p} primaryTag={tag} />
        ))}
      </div>
    </section>
  );
}
