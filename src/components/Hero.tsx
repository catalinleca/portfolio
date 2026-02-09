import styles from "./Hero.module.css";

export function Hero() {
  return (
    <div className={styles.hero}>
      <p className={styles.name}>Catalin Leca</p>
      <h1 className={styles.headline}>Senior Frontend Engineer</h1>
      <p className={styles.description}>
        I build complex, production-grade frontend systems — from editor UIs and
        real-time experiences to performance-critical platforms.
      </p>
      <ul className={styles.proof}>
        <li className={styles.proofItem}>
          Built a multi-app platform solo — 5 apps, 3 shared packages
        </li>
        <li className={styles.proofItem}>
          5+ years across Vodafone, Financial Times, Trading 212, Zafran
        </li>
        <li className={styles.proofItem}>
          217 backend tests, full-stack solo delivery
        </li>
      </ul>
      <div className={styles.links}>
        <a
          href="https://github.com/catalinleca"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.iconLink}
          aria-label="GitHub"
        >
          GitHub
        </a>
        <a
          href="https://linkedin.com/in/catalinleca"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.iconLink}
          aria-label="LinkedIn"
        >
          LinkedIn
        </a>
        <a
          href="mailto:catalin@catalinleca.dev"
          className={styles.iconLink}
          aria-label="Email"
        >
          Email
        </a>
      </div>
    </div>
  );
}
