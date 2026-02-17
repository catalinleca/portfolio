import Image from "next/image";
import Link from "next/link";
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
            A full-stack platform for creating and playing real-world treasure
            hunts — built solo from scratch. React 19 editor with real-time
            iframe preview, Node.js API with 217 tests, monorepo with 5 apps + 3
            shared packages.
          </p>
          <div className={styles.tags}>
            {hedgehuntTags.map((tag) => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
          </div>
          <div className={styles.actions}>
            <Link href="/case-study/hedgehunt" className={styles.cta}>
              Read case study →
            </Link>
            <ExternalLink
              href="https://hedgehunt.app"
              className={styles.appLink}
            >
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
              alt="HedgeHunt editor screenshot"
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
