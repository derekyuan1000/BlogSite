import { createFileRoute } from "@tanstack/react-router";
import { TopNav } from "@/components/blog/TopNav";
import { Hero } from "@/components/blog/Hero";
import { TagSection } from "@/components/blog/TagSection";
import { PostCard } from "@/components/blog/PostCard";
import { allPosts, getPostsByTag } from "@/content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Notes — A quiet blog" },
      {
        name: "description",
        content: "A calm, Notion-inspired blog. Drop a post file in src/content/posts/ and it appears here, grouped by tag.",
      },
      { property: "og:title", content: "Notes — A quiet blog" },
      {
        property: "og:description",
        content: "A calm, Notion-inspired blog. Drop a post file in src/content/posts/ and it appears here.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const grouped = getPostsByTag();
  const featured = allPosts.slice(0, 3);

  return (
    <div id="top" className="min-h-screen bg-canvas-soft text-ink antialiased">
      <TopNav />
      <main>
        <Hero />

        {allPosts.length === 0 ? (
          <section className="mx-auto max-w-3xl px-6 py-24 text-center">
            <h2 className="text-[26px] font-bold tracking-[-0.625px] text-ink">
              No posts yet
            </h2>
            <p className="mt-3 text-[16px] text-ink-muted">
              Create a file in{" "}
              <code className="rounded bg-canvas px-1.5 py-0.5">src/content/posts/</code>{" "}
              that exports a <code className="rounded bg-canvas px-1.5 py-0.5">post</code>{" "}
              object — title, subtitle, url, image, and tags.
            </p>
          </section>
        ) : (
          <>
            <section id="all" className="mx-auto max-w-6xl px-6 pb-4 scroll-mt-24">
              <div className="mb-8 flex items-end justify-between border-b border-hairline pb-4">
                <h2 className="text-[26px] font-bold leading-[1.23] tracking-[-0.625px] text-ink">
                  Featured
                </h2>
                <span className="text-[14px] text-ink-muted">Most recent</span>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {featured.map((p) => (
                  <PostCard key={p.slug} post={p} />
                ))}
              </div>
            </section>

            {grouped.map(({ tag, posts }) => (
              <TagSection key={tag} tag={tag} posts={posts} />
            ))}
          </>
        )}

        <footer className="mt-20 border-t border-hairline py-10 text-center text-[14px] text-ink-faint">
          Built by Derek Yuan {new Date().getFullYear()}
        </footer>
      </main>
    </div>
  );
}
