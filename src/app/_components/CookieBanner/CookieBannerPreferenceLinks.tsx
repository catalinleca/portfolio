import Link from "next/link";
import type { MouseEventHandler } from "react";
import { ExternalLink } from "@/ui/shared/ExternalLink/ExternalLink";
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
      <ExternalLink href="https://posthog.com/privacy" className={styles.link}>
        PostHog privacy
      </ExternalLink>
    </div>
  );
};
