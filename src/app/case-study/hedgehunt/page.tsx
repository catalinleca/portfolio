import { compileMDX } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import { getCaseStudySource } from "@/lib/mdx";
import { PageTransition } from "@/ui/motion";
import {
  SectionNav,
  ExecutiveSummary,
  DecisionCard,
  Mermaid,
} from "@/ui/case-study";
import type { Metadata } from "next";
import { hedgehuntMeta, hedgehuntSections } from "./content";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: hedgehuntMeta.title,
  description: hedgehuntMeta.description,
};

const mdxComponents = {
  ExecutiveSummary,
  DecisionCard,
  Mermaid,
};

export default async function HedgeHuntCaseStudy() {
  const source = getCaseStudySource("hedgehunt");
  const { content } = await compileMDX({
    source,
    options: {
      mdxOptions: {
        rehypePlugins: [rehypeSlug],
      },
    },
    components: mdxComponents,
  });

  return (
    <PageTransition>
      <div className={styles.layout}>
        <SectionNav sections={hedgehuntSections} />
        <article className="prose">{content}</article>
      </div>
    </PageTransition>
  );
}
