import { ExternalLink } from "@/ui/shared/ExternalLink/ExternalLink";
import styles from "../page.module.css";

export const PrivacyAnalyticsSection = () => {
  return (
    <section className={styles.section}>
      <h2>How analytics works</h2>
      <p>
        Analytics is powered by PostHog. The implementation tracks route changes, selected clicks
        marked for analytics, and scroll thresholds (25/50/75/90). Analytics only runs after
        explicit consent.
      </p>
      <p>
        Provider privacy details:{" "}
        <ExternalLink href="https://posthog.com/privacy" className={styles.inlineLink}>
          PostHog Privacy Policy
        </ExternalLink>
        .
      </p>
    </section>
  );
};
