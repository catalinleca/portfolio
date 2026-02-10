import styles from "./Footer.module.css";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <span>&copy; 2026 Catalin Leca</span>
      <span>Built with Next.js + CSS Modules</span>
    </footer>
  );
};
