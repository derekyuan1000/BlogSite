import { getTagCounts, tagSlug, allPosts } from "@/content";

export function TopNav() {
  const tags = getTagCounts();

  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-canvas/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <a href="#top" className="flex items-center gap-2 text-ink">
          <span className="text-[16px] font-semibold tracking-[-0.125px]">Weekly Blogs</span>
        </a>
        <nav className="flex flex-wrap items-center gap-1.5">
          <a
            href="#all"
            className="rounded-full px-3 py-1.5 text-[14px] font-medium text-ink-secondary transition-colors hover:bg-canvas-soft"
          >
            All <span className="ml-1 text-ink-faint">{allPosts.length}</span>
          </a>
          {tags.map(({ tag, count }) => (
            <a
              key={tag}
              href={`#${tagSlug(tag)}`}
              className="rounded-full px-3 py-1.5 text-[14px] font-medium text-ink-secondary transition-colors hover:bg-canvas-soft"
            >
              {tag} <span className="ml-1 text-ink-faint">{count}</span>
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
