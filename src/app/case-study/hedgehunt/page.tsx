import { compileMDX } from "next-mdx-remote/rsc";
import { getCaseStudySource } from "@/lib/mdx";
import { PageTransition } from "@/components/PageTransition";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HedgeHunt Case Study — Catalin Leca",
  description:
    "A deep dive into building a full-stack treasure hunt platform — architecture, technical decisions, and patterns.",
};

export default async function HedgeHuntCaseStudy() {
  const source = getCaseStudySource("hedgehunt");
  const { content } = await compileMDX({
    source,
    options: { parseFrontmatter: true },
  });

  return (
    <PageTransition>
      <article className="prose">{content}</article>
    </PageTransition>
  );
}
