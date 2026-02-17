import fs from "fs";
import path from "path";

const CONTENT_DIR = path.join(process.cwd(), "src/content/case-studies");

export const getCaseStudySource = (slug: string): string => {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);

  return fs.readFileSync(filePath, "utf-8");
};
