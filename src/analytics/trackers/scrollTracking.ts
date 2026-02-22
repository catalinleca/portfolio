import { ANALYTICS_EVENTS, ANALYTICS_SCROLL_THRESHOLDS } from "../constants";
import type { CaptureEvent } from "../types";

const seenThresholds = new Set<string>();

const getReachedScrollDepth = (): number => {
  const maxScrollableDistance = document.documentElement.scrollHeight - window.innerHeight;

  if (maxScrollableDistance <= 0) {
    return 0;
  }

  return Math.round((window.scrollY / maxScrollableDistance) * 100);
};

export const registerScrollTracking = (captureEvent: CaptureEvent): void => {
  const handleScroll = () => {
    const reachedDepth = getReachedScrollDepth();
    const currentPath = window.location.pathname;

    ANALYTICS_SCROLL_THRESHOLDS.forEach((threshold) => {
      if (reachedDepth < threshold) {
        return;
      }

      const thresholdKey = `${currentPath}:${threshold}`;
      if (seenThresholds.has(thresholdKey)) {
        return;
      }

      seenThresholds.add(thresholdKey);
      captureEvent(ANALYTICS_EVENTS.scrollDepth, {
        scroll_threshold: threshold,
        page_path: currentPath,
      });
    });
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
};
