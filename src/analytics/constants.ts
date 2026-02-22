export const ANALYTICS_EVENTS = {
  click: "portfolio_click",
  pageView: "portfolio_page_view",
  scrollDepth: "portfolio_scroll_depth",
} as const;

export const ANALYTICS_INTERNAL_QUERY_PARAM = "internal";
export const ANALYTICS_INTERNAL_STORAGE_KEY = "portfolio_internal_traffic";
export const ANALYTICS_SCROLL_THRESHOLDS = [25, 50, 75, 90] as const;
export const DEFAULT_POSTHOG_HOST = "https://us.i.posthog.com";

export const SEARCH_ENGINE_DOMAINS = [
  "google.com",
  "bing.com",
  "duckduckgo.com",
  "yahoo.com",
  "baidu.com",
  "yandex.com",
  "ecosia.org",
] as const;
