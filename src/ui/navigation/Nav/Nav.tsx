import Link from "next/link";
import styles from "./Nav.module.css";

export function Nav() {
  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          catalin<span className={styles.dot}>.</span>leca
        </Link>
        <div className={styles.links}>
          <a href="#work" className={styles.link}>
            work
          </a>
          <a href="#about" className={styles.link}>
            about
          </a>
          <a href="#experience" className={styles.link}>
            experience
          </a>
          <a
            href="/resume.pdf"
            className={`${styles.link} ${styles.resumeLink}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            resume.pdf
          </a>
        </div>
      </div>
    </nav>
  );
}
