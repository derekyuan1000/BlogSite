import { allPosts, getTagCounts } from "@/content";

export function Hero() {
  const tagCount = getTagCounts().length;

  return (
    <section className="mx-auto max-w-6xl px-6 pt-16 pb-10 md:pt-24 md:pb-14">
      <p className="text-[12px] font-semibold uppercase tracking-[0.125px] text-primary">
        Latest articles
      </p>
      <h1 className="mt-4 max-w-3xl text-[40px] font-bold leading-[1.1] tracking-[-1px] text-ink md:text-[54px] md:leading-[1.04] md:tracking-[-1.875px]">
        A weekly update on blogs posted by Derek Yuan
      </h1>
      <p className="mt-5 max-w-xl text-[16px] leading-[1.5] text-ink-muted">
        {allPosts.length} {allPosts.length === 1 ? "post" : "posts"} across {tagCount}{" "}
        {tagCount === 1 ? "topic" : "topics"}.
      </p>
    </section>
  );
}
