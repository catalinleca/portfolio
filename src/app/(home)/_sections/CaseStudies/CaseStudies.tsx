import { SectionLabel } from "@/ui/shared";
import { CaseStudyCard } from "./CaseStudyCard";
import styles from "./CaseStudies.module.css";

export const CaseStudies = () => {
  return (
    <section id="work" className={styles.section}>
      <SectionLabel label="featured work" />
      <CaseStudyCard />
    </section>
  );
};
