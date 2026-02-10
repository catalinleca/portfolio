import styles from "./Hero.module.css";

export const Hero = () => {
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
          Reduced system vulnerabilities 90% at the Financial Times
        </li>
        <li className={styles.proofItem}>
          Rearchitected a legacy CMS into a modular React system at Education
          First
        </li>
        <li className={styles.proofItem}>
          Shipped a full-stack platform solo — editor, player, API, shared SDK,
          217 automated tests
        </li>
      </ul>
      <div className={styles.links}>
        <a href="/resume.pdf" className={styles.resumeLink}>
          Resume
        </a>
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
};
