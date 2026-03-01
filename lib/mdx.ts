import fs from "fs";
import path from "path";
import matter from "gray-matter";

const STORIES_DIR = path.join(process.cwd(), "data", "stories");

export interface StoryFrontmatter {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  region: string;
  country: string;
  coverImage: string;
  tags: string[];
}

export interface Story extends StoryFrontmatter {
  slug: string;
  content: string;
}

export function getAllStories(): Story[] {
  const files = fs.readdirSync(STORIES_DIR).filter((f) => f.endsWith(".mdx"));
  return files
    .map((file) => {
      const slug = file.replace(".mdx", "");
      const raw = fs.readFileSync(path.join(STORIES_DIR, file), "utf-8");
      const { data, content } = matter(raw);
      return { slug, content, ...(data as StoryFrontmatter) };
    })
    .sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
}

export function getStoryBySlug(slug: string): Story | null {
  const file = path.join(STORIES_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf-8");
  const { data, content } = matter(raw);
  return { slug, content, ...(data as StoryFrontmatter) };
}
