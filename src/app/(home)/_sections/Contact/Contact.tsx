import styles from "./Contact.module.css";

export const Contact = () => {
  return (
    <div className={styles.section}>
      <h2 className={styles.heading}>Get in touch</h2>
      <p className={styles.subtext}>
        Open to senior frontend roles and interesting technical challenges.
      </p>
      <div className={styles.links}>
        <a href="mailto:catalin@catalinleca.dev" className={styles.link}>
          Email
        </a>
        <a
          href="https://github.com/catalinleca"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          GitHub
        </a>
        <a
          href="https://linkedin.com/in/catalinleca"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          LinkedIn
        </a>
      </div>
      <p className={styles.status}>Currently building HedgeHunt.</p>
    </div>
  );
};
