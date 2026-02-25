import styles from "../page.module.css";

export const PrivacyWhatWeCollectSection = () => {
  return (
    <section className={styles.section}>
      <h2>What we collect</h2>
      <p>
        When analytics cookies are enabled, we collect anonymized usage signals such as page views,
        link clicks, and scroll depth milestones. We do not intentionally collect sensitive personal
        data through analytics events.
      </p>
    </section>
  );
};
