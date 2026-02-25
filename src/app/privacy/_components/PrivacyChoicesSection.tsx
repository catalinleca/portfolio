import Link from "next/link";
import styles from "../page.module.css";

export const PrivacyChoicesSection = () => {
  return (
    <section className={styles.section}>
      <h2>Your choices</h2>
      <p>
        You can accept all cookies, accept essentials only, or manage preferences. You can reopen
        cookie preferences at any time.
      </p>
      <div className={styles.actions}>
        <Link href="/" className={styles.button}>
          Back to homepage
        </Link>
      </div>
    </section>
  );
};
