import styles from "./Footer.module.css";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <span>&copy; {new Date().getFullYear()} Catalin Leca</span>
      <a
        href="https://github.com/catalinleca/portfolio"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.footerLink}
      >
        Source
      </a>
    </footer>
  );
};
