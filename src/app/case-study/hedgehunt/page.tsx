import { compileMDX } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import { getCaseStudySource } from "@/lib/mdx";
import { PageTransition } from "@/ui/motion";
import {
  SectionNav,
  ExecutiveSummary,
  DecisionCard,
  CardField,
  Mermaid,
} from "@/ui/case-study";
import type { Metadata } from "next";
import { hedgehuntMeta, hedgehuntSections } from "./content";
import styles from "./page.module.css";
import darculaTheme from "@/styles/shiki-darcula.json";

export const metadata: Metadata = {
  title: hedgehuntMeta.title,
  description: hedgehuntMeta.description,
};

const mdxComponents = {
  ExecutiveSummary,
  DecisionCard,
  CardField,
  Mermaid,
};

export default async function HedgeHuntCaseStudy() {
  const source = getCaseStudySource("hedgehunt");
  const { content } = await compileMDX({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [
          rehypeSlug,
          [rehypePrettyCode, { theme: darculaTheme, keepBackground: false }],
        ],
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
