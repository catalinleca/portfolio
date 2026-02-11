import Link from "next/link";
import { WindowChrome } from "./WindowChrome";
import styles from "./CaseStudyCard.module.css";

const tags = [
  "react-19",
  "typescript",
  "mui-v6",
  "tanstack-query",
  "google-maps",
  "edge-computing",
];

export const CaseStudyCard = () => {
  return (
    <WindowChrome title="hedgehunt.app">
      <div className={styles.body}>
        <div className={styles.info}>
          <div className={styles.overline}>Platform · Case Study</div>
          <h3 className={styles.title}>HedgeHunt</h3>
          <p className={styles.description}>
            A full-stack platform for creating and playing real-world treasure
            hunts — built solo from scratch. React 19 editor with real-time
            iframe preview, Node.js API with 217 tests, monorepo with 5 apps + 3
            shared packages.
          </p>
          <div className={styles.tags}>
            {tags.map((tag) => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
          </div>
          <Link href="/case-study/hedgehunt" className={styles.cta}>
            Read case study <span className={styles.arrow}>→</span>
          </Link>
        </div>
        <div className={styles.preview}>
          <div className={styles.previewFrame}>
            <div className={styles.miniChrome}>
              <div className={styles.miniDots}>
                <span />
                <span />
                <span />
              </div>
              <div className={styles.urlBar}>hedgehunt.app/editor</div>
            </div>
            <div className={styles.screenshot} />
          </div>
          <div className={styles.badge}>hedgehunt.app</div>
        </div>
      </div>
    </WindowChrome>
  );
};
