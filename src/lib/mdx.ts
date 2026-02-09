import fs from "fs";
import path from "path";

const CONTENT_DIR = path.join(process.cwd(), "src/content/case-studies");

export function getCaseStudySource(slug: string): string {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  return fs.readFileSync(filePath, "utf-8");
}

export function getAllCaseStudySlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}
