export type Post = {
  /** Article title — shown large on the card. */
  title: string;
  /** One-line subtitle / summary shown under the title. */
  subtitle: string;
  /** External URL the card links to (opens in a new tab). */
  url: string;
  /** Cover image URL (Unsplash, CDN, etc). */
  image: string;
  /** Tags. Post appears in every tag section it's listed in. */
  tags: string[];
  /** Optional author byline. */
  author?: {
    name: string;
    avatar?: string;
  };
  /** ISO date string, e.g. "2026-06-20". Used for sort order. */
  date?: string;
};

export type LoadedPost = Post & { slug: string };
