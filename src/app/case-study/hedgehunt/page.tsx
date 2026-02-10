import { compileMDX } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import { getCaseStudySource } from "@/lib/mdx";
import { PageTransition } from "@/ui/motion";
import { SectionNav } from "@/ui/navigation";
import { ExecutiveSummary } from "@/mdx-components/ExecutiveSummary";
import { DecisionCard } from "@/mdx-components/DecisionCard";
import { Mermaid } from "@/mdx-components/Mermaid";
import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "HedgeHunt Case Study — Catalin Leca",
  description:
    "A deep dive into building a full-stack treasure hunt platform — architecture, technical decisions, and patterns.",
};

const mdxComponents = {
  ExecutiveSummary,
  DecisionCard,
  Mermaid,
};

const sections = [
  { id: "overview", label: "Overview" },
  { id: "architecture", label: "Architecture" },
  { id: "decisions", label: "Decisions" },
  { id: "patterns", label: "Patterns" },
  { id: "what-id-do-next", label: "What I'd Do Next" },
  { id: "numbers", label: "Numbers" },
];

export default async function HedgeHuntCaseStudy() {
  const source = getCaseStudySource("hedgehunt");
  const { content } = await compileMDX({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [rehypeSlug],
      },
    },
    components: mdxComponents,
  });

  return (
    <PageTransition>
      <div className={styles.layout}>
        <SectionNav sections={sections} />
        <article className="prose">{content}</article>
      </div>
    </PageTransition>
  );
}
