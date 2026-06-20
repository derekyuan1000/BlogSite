import type { LoadedPost, Post } from "./types";

// Eager-glob every post file. Drop a new file in ./posts/ and it appears.
const modules = import.meta.glob<{ post: Post }>("./posts/*.ts", { eager: true });

export const allPosts: LoadedPost[] = Object.entries(modules)
  .map(([path, mod]) => {
    const slug = path.replace("./posts/", "").replace(/\.ts$/, "");
    return { slug, ...mod.post };
  })
  .sort((a, b) => {
    const da = a.date ? Date.parse(a.date) : 0;
    const db = b.date ? Date.parse(b.date) : 0;
    return db - da;
  });

export function getTagCounts(): { tag: string; count: number }[] {
  const map = new Map<string, number>();
  for (const p of allPosts) {
    for (const t of p.tags) map.set(t, (map.get(t) ?? 0) + 1);
  }
  return [...map.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export function getPostsByTag(): { tag: string; posts: LoadedPost[] }[] {
  return getTagCounts().map(({ tag }) => ({
    tag,
    posts: allPosts.filter((p) => p.tags.includes(tag)),
  }));
}

/** Stable id for anchor links. */
export function tagSlug(tag: string): string {
  return tag.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

/** Deterministic accent color per tag — same tag is always the same color. */
const ACCENTS = [
  "sky",
  "purple",
  "pink",
  "orange",
  "teal",
  "green",
  "brown",
] as const;
export type AccentName = (typeof ACCENTS)[number];

export function tagAccent(tag: string): AccentName {
  let h = 0;
  for (let i = 0; i < tag.length; i++) h = (h * 31 + tag.charCodeAt(i)) >>> 0;
  return ACCENTS[h % ACCENTS.length];
}
