import Link from "next/link";
import { ExternalLink } from "@/ui/shared";
import styles from "./Nav.module.css";

export function Nav() {
  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          Catalin Leca
        </Link>
        <div className={styles.links}>
          <Link href="/#about" className={styles.link}>
            about
          </Link>
          <Link href="/#experience" className={styles.link}>
            experience
          </Link>
          <Link href="/#work" className={styles.link}>
            work
          </Link>
          <ExternalLink
            href="/resume.pdf"
            className={`${styles.link} ${styles.resumeLink}`}
          >
            resume.pdf
          </ExternalLink>
        </div>
      </div>
    </nav>
  );
}
