"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import type { MouseEvent } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  getCookieConsentSnapshot,
  saveCookieConsent,
  subscribeToCookieConsent,
} from "@/privacy/cookieConsent";
import styles from "./CookieBanner.module.css";

const hasAnalyticsKey = (process.env.NEXT_PUBLIC_POSTHOG_KEY ?? "").length > 0;
const subscribeToHydration = () => {
  return () => {};
};
const DEFAULT_ANALYTICS_ENABLED = true;
const PRIVACY_PATH = "/privacy";
const COOKIES_HASH = "#cookies";

const normalizePathname = (value: string): string =>
  value.endsWith("/") && value.length > 1 ? value.slice(0, -1) : value;

export const CookieBanner = () => {
  const pathname = usePathname();
  const router = useRouter();
  const isHydrated = useSyncExternalStore(subscribeToHydration, () => true, () => false);
  const consent = useSyncExternalStore(
    subscribeToCookieConsent,
    getCookieConsentSnapshot,
    () => null
  );
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [isAnalyticsEnabled, setIsAnalyticsEnabled] = useState(DEFAULT_ANALYTICS_ENABLED);
  const hasDecision = consent != null;
  const isBannerVisible = !hasDecision || isPreferencesOpen;
  const persistedAnalyticsEnabled = consent?.analytics ?? DEFAULT_ANALYTICS_ENABLED;
  const activeAnalyticsState = isPreferencesOpen ? isAnalyticsEnabled : persistedAnalyticsEnabled;
  const shouldRenderStatusBadge = hasDecision || isPreferencesOpen;
  const statusLabel = activeAnalyticsState ? "Analytics enabled" : "Analytics disabled";

  const openPreferences = () => {
    setIsAnalyticsEnabled(consent?.analytics ?? DEFAULT_ANALYTICS_ENABLED);
    setIsPreferencesOpen(true);
  };

  const redirectToCookiesSection = () => {
    router.push(`${PRIVACY_PATH}${COOKIES_HASH}`);
  };

  const syncCookiesHash = () => {
    if (window.location.hash === COOKIES_HASH) {
      window.history.replaceState({}, "", PRIVACY_PATH);
    }

    window.history.replaceState({}, "", `${PRIVACY_PATH}${COOKIES_HASH}`);
  };

  const handleCookieDetailsClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    const currentPath = normalizePathname(pathname);
    if (currentPath !== PRIVACY_PATH) {
      redirectToCookiesSection();
      return;
    }

    const cookieSection = document.getElementById("cookies");
    if (cookieSection == null) {
      redirectToCookiesSection();
      return;
    }

    cookieSection.scrollIntoView({ behavior: "smooth", block: "start" });
    syncCookiesHash();
  };

  if (!hasAnalyticsKey || !isHydrated) {
    return null;
  }

  const saveConsent = (analyticsEnabled: boolean) => {
    saveCookieConsent(analyticsEnabled);
    setIsAnalyticsEnabled(analyticsEnabled);
    setIsPreferencesOpen(false);
  };

  if (!isBannerVisible) {
    return (
      <button
        type="button"
        className={styles.settingsButton}
        onClick={openPreferences}
      >
        Cookie settings
      </button>
    );
  }

  return (
    <aside className={styles.banner} role="dialog" aria-label="Cookie preferences">
      <div className={styles.head}>
        <div className={styles.copy}>
          <p className={styles.title}>Cookie preferences</p>
          <p className={styles.description}>
            We use essential cookies for core site behavior. Analytics cookies are optional and
            help us understand how visitors use this portfolio.
          </p>
        </div>
        <div className={styles.headControls}>
          {shouldRenderStatusBadge && (
            <span
              className={`${styles.status} ${activeAnalyticsState ? styles.statusEnabled : styles.statusDisabled}`}
            >
              {statusLabel}
            </span>
          )}
          {isPreferencesOpen && hasDecision && (
            <button
              type="button"
              aria-label="Close cookie preferences"
              className={styles.iconClose}
              onClick={() => setIsPreferencesOpen(false)}
            >
              x
            </button>
          )}
        </div>
      </div>

      {!isPreferencesOpen && (
        <div className={styles.actions}>
          <button type="button" className={styles.btnPrimary} onClick={() => saveConsent(true)}>
            Accept all
          </button>
          <button
            type="button"
            className={`${styles.btnGhost} ${styles.btnSubtle}`}
            onClick={() => saveConsent(false)}
          >
            Accept essentials
          </button>
          <button type="button" className={styles.btnText} onClick={openPreferences}>
            Manage preferences
          </button>
        </div>
      )}

      {isPreferencesOpen && (
        <div className={styles.preferences}>
          <div className={styles.preferenceRow}>
            <div>
              <p className={styles.preferenceName}>Essential cookies</p>
              <p className={styles.preferenceHint}>Required for site operation.</p>
            </div>
            <span className={styles.locked}>Always on</span>
          </div>

          <div className={styles.preferenceRow}>
            <div>
              <p className={styles.preferenceName}>Analytics cookies</p>
              <p className={styles.preferenceHint}>Anonymous usage insights via PostHog.</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-label="Toggle analytics cookies"
              aria-checked={isAnalyticsEnabled}
              className={`${styles.switch} ${isAnalyticsEnabled ? styles.switchOn : ""}`}
              onClick={() => setIsAnalyticsEnabled((previousValue) => !previousValue)}
            >
              <span className={styles.switchThumb} />
            </button>
          </div>

          <div className={styles.links}>
            <Link href="/privacy" className={styles.link}>
              Privacy notice
            </Link>
            <Link
              href="/privacy#cookies"
              className={styles.link}
              onClick={handleCookieDetailsClick}
            >
              Cookie details
            </Link>
            <a
              href="https://posthog.com/privacy"
              target="_blank"
              rel="noreferrer"
              className={styles.link}
            >
              PostHog privacy
            </a>
          </div>

          <div className={`${styles.actions} ${styles.preferencesActions}`}>
            <button
              type="button"
              className={`${styles.btnGhost} ${styles.btnSubtle}`}
              onClick={() => saveConsent(false)}
            >
              Essentials only
            </button>
            <button
              type="button"
              className={`${styles.btnGhost} ${styles.btnAffirm}`}
              onClick={() => saveConsent(true)}
            >
              Accept all
            </button>
            <button
              type="button"
              className={styles.btnPrimary}
              onClick={() => saveConsent(isAnalyticsEnabled)}
            >
              Save preferences
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};
