import styles from "../page.module.css";

export const PrivacyCookieCategoriesSection = () => {
  return (
    <section id="cookies" className={styles.section}>
      <h2>Cookie categories</h2>
      <ul className={styles.list}>
        <li>
          <strong>Essential cookies:</strong> required for baseline functionality and consent state
          storage.
        </li>
        <li>
          <strong>Analytics cookies:</strong> optional, used to measure engagement and site
          performance.
        </li>
      </ul>
    </section>
  );
};
