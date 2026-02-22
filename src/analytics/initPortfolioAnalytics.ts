import posthog from "posthog-js";
import { DEFAULT_POSTHOG_HOST } from "./constants";
import { buildPortfolioContext, syncInternalTrafficModeFromQueryParam } from "./context";
import { registerClickTracking, registerScrollTracking } from "./trackers";
import type { CaptureEvent } from "./types";

let isAnalyticsInitialized = false;

const getPosthogHost = (): string => {
  const configuredHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;

  if (configuredHost == null || configuredHost.length === 0) {
    return DEFAULT_POSTHOG_HOST;
  }

  return configuredHost;
};

export const initPortfolioAnalytics = (): void => {
  if (typeof window === "undefined" || isAnalyticsInitialized) {
    return;
  }

  const analyticsKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (analyticsKey == null || analyticsKey.length === 0) {
    return;
  }

  syncInternalTrafficModeFromQueryParam();

  posthog.init(analyticsKey, {
    api_host: getPosthogHost(),
    autocapture: false,
    capture_pageview: false,
  });

  posthog.register(buildPortfolioContext());

  const captureEvent: CaptureEvent = (eventName, properties = {}) => {
    posthog.capture(eventName, properties);
  };

  registerClickTracking(captureEvent);
  registerScrollTracking(captureEvent);

  isAnalyticsInitialized = true;
};

export const capturePortfolioEvent: CaptureEvent = (eventName, properties = {}) => {
  if (!isAnalyticsInitialized) {
    return;
  }

  posthog.capture(eventName, properties);
};
