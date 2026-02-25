import styles from "../page.module.css";

interface PrivacyArticleHeaderProps {
  lastUpdated: string;
}

export const PrivacyArticleHeader = ({ lastUpdated }: PrivacyArticleHeaderProps) => {
  return (
    <>
      <p className={styles.eyebrow}>Legal</p>
      <h1 className={styles.title}>Privacy & Cookie Notice</h1>
      <p className={styles.lead}>
        This portfolio uses optional analytics to understand visitor behavior and improve the
        experience. You can update cookie preferences at any time from the Cookie settings control.
      </p>
      <p className={styles.meta}>Last updated: {lastUpdated}</p>
    </>
  );
};
