import Image from "next/image";
import Link from "next/link";
import { trackClick } from "@/analytics";
import { ExternalLink } from "@/ui/shared";
import { hedgehuntTags } from "../content";
import { WindowChrome } from "./WindowChrome";
import styles from "./CaseStudyCard.module.css";

export const CaseStudyCard = () => {
  return (
    <WindowChrome title="build.hedgehunt.app">
      <div className={styles.body}>
        <div className={styles.info}>
          <div className={styles.overline}>Platform</div>
          <h3 className={styles.title}>HedgeHunt</h3>
          <p className={styles.description}>
            A platform for creating and solving real-world treasure hunts.
            Design hunts with GPS challenges, quizzes, and missions validated
            by AI, or generate full hunts from a prompt. Solve them on mobile
            with location, camera, and audio. Publish, iterate, roll back.
            Players never notice.
          </p>
          <div className={styles.tags}>
            {hedgehuntTags.map((tag) => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
          </div>
          <div className={styles.actions}>
            <Link href="/case-study/hedgehunt" className={styles.cta} {...trackClick("case_study_read", "featured_work")}>
              Read case study →
            </Link>
            <ExternalLink href="https://hedgehunt.app" className={styles.appLink} {...trackClick("case_study_visit_app", "featured_work")}>
              Visit app ↗
            </ExternalLink>
          </div>
        </div>
        <div className={styles.preview}>
          <div className={styles.previewFrame}>
            <div className={styles.miniChrome}>
              <div className={styles.miniDots}>
                <span />
                <span />
                <span />
              </div>
              <div className={styles.urlBar}>build.hedgehunt.app</div>
            </div>
            <Image
              src="/images/hedgehunt-editor.webp"
              alt="HedgeHunt builder screenshot"
              width={720}
              height={450}
              className={styles.screenshot}
            />
          </div>
        </div>
      </div>
    </WindowChrome>
  );
};
