import Link from "next/link";
import { Footer } from "@/ui/layout";
import styles from "./page.module.css";

const LAST_UPDATED = "February 24, 2026";

export default function PrivacyPage() {
  return (
    <>
      <main className={styles.main}>
        <article className={styles.article}>
          <p className={styles.eyebrow}>Legal</p>
          <h1 className={styles.title}>Privacy & Cookie Notice</h1>
          <p className={styles.lead}>
            This portfolio uses optional analytics to understand visitor behavior and improve the
            experience. You can update cookie preferences at any time from the Cookie settings
            control.
          </p>
          <p className={styles.meta}>Last updated: {LAST_UPDATED}</p>

          <section className={styles.section}>
            <h2>What we collect</h2>
            <p>
              When analytics cookies are enabled, we collect anonymized usage signals such as page
              views, link clicks, and scroll depth milestones. We do not intentionally collect
              sensitive personal data through analytics events.
            </p>
          </section>

          <section className={styles.section}>
            <h2>How analytics works</h2>
            <p>
              Analytics is powered by PostHog. The implementation tracks route changes, selected
              clicks marked for analytics, and scroll thresholds (25/50/75/90). Analytics only runs
              after explicit consent.
            </p>
            <p>
              Provider privacy details:{" "}
              <a href="https://posthog.com/privacy" target="_blank" rel="noreferrer" className={styles.inlineLink}>
                PostHog Privacy Policy
              </a>
              .
            </p>
          </section>

          <section id="cookies" className={styles.section}>
            <h2>Cookie categories</h2>
            <ul className={styles.list}>
              <li>
                <strong>Essential cookies:</strong> required for baseline functionality and consent
                state storage.
              </li>
              <li>
                <strong>Analytics cookies:</strong> optional, used to measure engagement and site
                performance.
              </li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>Your choices</h2>
            <p>
              You can accept all cookies, accept essentials only, or manage preferences. You can
              reopen cookie preferences at any time.
            </p>
            <div className={styles.actions}>
              <Link href="/" className={styles.button}>
                Back to homepage
              </Link>
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
