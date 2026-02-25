"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  ANALYTICS_EVENTS,
  capturePortfolioEvent,
  initPortfolioAnalytics,
  setPortfolioAnalyticsEnabled,
} from "@/analytics";
import {
  isAnalyticsConsentGranted,
  subscribeToCookieConsent,
} from "@/privacy/cookieConsent";

export const AnalyticsClient = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastTrackedPage = useRef<string | null>(null);
  const isAnalyticsAllowed = useSyncExternalStore(
    subscribeToCookieConsent,
    isAnalyticsConsentGranted,
    () => false
  );

  useEffect(() => {
    if (!isAnalyticsAllowed) {
      setPortfolioAnalyticsEnabled(false);
      return;
    }

    initPortfolioAnalytics();
    setPortfolioAnalyticsEnabled(true);
  }, [isAnalyticsAllowed]);

  useEffect(() => {
    if (!isAnalyticsAllowed) {
      lastTrackedPage.current = null;
      return;
    }

    const queryString = searchParams.toString();
    const pageUrl = queryString.length > 0 ? `${pathname}?${queryString}` : pathname;

    if (lastTrackedPage.current === pageUrl) {
      return;
    }

    lastTrackedPage.current = pageUrl;

    capturePortfolioEvent(ANALYTICS_EVENTS.pageView, {
      page_path: pathname,
      page_url: pageUrl,
    });
  }, [isAnalyticsAllowed, pathname, searchParams]);

  return null;
};
