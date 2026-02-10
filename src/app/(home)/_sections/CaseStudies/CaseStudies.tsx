import { CaseStudyCard } from "./CaseStudyCard";
import styles from "./CaseStudies.module.css";

export const CaseStudies = () => {
  return (
    <div className={styles.section}>
      <h2 className={styles.heading}>Featured Work</h2>
      <div className={styles.grid}>
        <CaseStudyCard
          label="Case Study"
          title="HedgeHunt"
          description="A full-stack platform for creating and playing real-world treasure hunts — built solo from scratch."
          bullets={[
            "React 19 editor with real-time iframe preview",
            "Node.js API with 217 tests",
            "Monorepo: 5 apps + 3 shared packages",
          ]}
          href="/case-study/hedgehunt"
          externalHref="https://hedgehunt.app"
          externalLabel="Visit product"
        />
      </div>
    </div>
  );
};
