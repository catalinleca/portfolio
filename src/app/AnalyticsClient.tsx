"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { ANALYTICS_EVENTS, capturePortfolioEvent, initPortfolioAnalytics } from "@/analytics";

export const AnalyticsClient = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastTrackedPage = useRef<string | null>(null);

  useEffect(() => {
    initPortfolioAnalytics();
  }, []);

  useEffect(() => {
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
  }, [pathname, searchParams]);

  return null;
};
