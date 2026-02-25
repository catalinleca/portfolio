import Link from "next/link";
import type { MouseEventHandler } from "react";
import styles from "./CookieBanner.module.css";

interface CookieBannerPreferenceLinksProps {
  onCookieDetailsClick: MouseEventHandler<HTMLAnchorElement>;
}

export const CookieBannerPreferenceLinks = ({
  onCookieDetailsClick,
}: CookieBannerPreferenceLinksProps) => {
  return (
    <div className={styles.links}>
      <Link href="/privacy" className={styles.link}>
        Privacy notice
      </Link>
      <Link href="/privacy#cookies" className={styles.link} onClick={onCookieDetailsClick}>
        Cookie details
      </Link>
      <a href="https://posthog.com/privacy" target="_blank" rel="noreferrer" className={styles.link}>
        PostHog privacy
      </a>
    </div>
  );
};
