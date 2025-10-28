import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const CHANGELOG_DIR = path.join(process.cwd(), "changelog");

export type ChangelogItem = {
  slug: string;
  title?: string;
  date?: string;
  contentHtml: string;
  raw: string;
};

export async function getAllChangelogs(): Promise<ChangelogItem[]> {
  if (!fs.existsSync(CHANGELOG_DIR)) return [];

  const files = fs.readdirSync(CHANGELOG_DIR).filter((f) => f.endsWith(".md"));

  const items: ChangelogItem[] = await Promise.all(
    files.map(async (file) => {
      const fullPath = path.join(CHANGELOG_DIR, file);
      const raw = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(raw);
      const processed = await remark().use(html).process(content);
      const contentHtml = processed.toString();

      return {
        slug: file.replace(/\.md$/, ""),
        title: data.title ?? file.replace(/\.md$/, ""),
        date: data.date ?? null,
        contentHtml,
        raw,
      };
    })
  );

  // Sort by date (descending) if date exists, otherwise by slug (descending)
  items.sort((a, b) => {
    if (a.date && b.date)
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    return b.slug.localeCompare(a.slug);
  });

  return items;
}
