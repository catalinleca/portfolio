import {
  ANALYTICS_INTERNAL_QUERY_PARAM,
  ANALYTICS_INTERNAL_STORAGE_KEY,
  SEARCH_ENGINE_DOMAINS,
} from "./constants";
import type { AnalyticsProperties } from "./types";

const getNormalizedDomain = (value: string): string => {
  if (value.length === 0) {
    return "";
  }

  return value.toLowerCase().replace(/^www\./, "");
};

const NORMALIZED_SEARCH_ENGINE_DOMAINS = SEARCH_ENGINE_DOMAINS.map((domain) =>
  getNormalizedDomain(domain)
);

const resolveReferrerDomain = (): string => {
  if (document.referrer.length === 0) {
    return "";
  }

  try {
    return getNormalizedDomain(new URL(document.referrer).hostname);
  } catch {
    return "";
  }
};

const hasSearchEngineReferrer = (referrerDomain: string): boolean => {
  if (referrerDomain.length === 0) {
    return false;
  }

  return NORMALIZED_SEARCH_ENGINE_DOMAINS.some((searchEngineDomain) => {
    if (referrerDomain === searchEngineDomain) {
      return true;
    }

    return referrerDomain.endsWith(`.${searchEngineDomain}`);
  });
};

const getQueryParamValue = (name: string): string | undefined => {
  const queryParams = new URLSearchParams(window.location.search);
  const value = queryParams.get(name);

  if (value == null || value.length === 0) {
    return undefined;
  }

  return value;
};

export const syncInternalTrafficModeFromQueryParam = (): void => {
  const queryParams = new URLSearchParams(window.location.search);
  const internalTrafficParam = queryParams.get(ANALYTICS_INTERNAL_QUERY_PARAM);

  if (internalTrafficParam == null) {
    return;
  }

  try {
    if (internalTrafficParam === "0") {
      window.localStorage.removeItem(ANALYTICS_INTERNAL_STORAGE_KEY);
    } else {
      window.localStorage.setItem(ANALYTICS_INTERNAL_STORAGE_KEY, "true");
    }
  } catch {
    // localStorage may be unavailable (private browsing, storage full)
  }

  queryParams.delete(ANALYTICS_INTERNAL_QUERY_PARAM);
  const queryString = queryParams.toString();
  const nextUrl = `${window.location.pathname}${queryString.length > 0 ? `?${queryString}` : ""}${window.location.hash}`;
  window.history.replaceState({}, "", nextUrl);
};

const resolveTrafficType = (): "internal" | "external" => {
  let hasInternalFlag = false;

  try {
    hasInternalFlag = window.localStorage.getItem(ANALYTICS_INTERNAL_STORAGE_KEY) === "true";
  } catch {
    hasInternalFlag = false;
  }

  if (hasInternalFlag) {
    return "internal";
  }

  return "external";
};

const resolveSourceChannel = (
  utmSource: string | undefined,
  referrerDomain: string
): "campaign" | "direct" | "organic_search" | "referral" => {
  if (utmSource != null) {
    return "campaign";
  }

  if (referrerDomain.length === 0) {
    return "direct";
  }

  if (hasSearchEngineReferrer(referrerDomain)) {
    return "organic_search";
  }

  return "referral";
};

const UTM_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

export const stripUtmParams = (): void => {
  const queryParams = new URLSearchParams(window.location.search);
  const hadUtm = UTM_PARAMS.some((param) => queryParams.has(param));

  if (!hadUtm) {
    return;
  }

  for (const param of UTM_PARAMS) {
    queryParams.delete(param);
  }

  const queryString = queryParams.toString();
  const nextUrl = `${window.location.pathname}${queryString.length > 0 ? `?${queryString}` : ""}${window.location.hash}`;
  window.history.replaceState({}, "", nextUrl);
};

export const buildPortfolioContext = (): AnalyticsProperties => {
  const utmSource = getQueryParamValue("utm_source");
  const referrerDomain = resolveReferrerDomain();

  const context: AnalyticsProperties = {
    referrer_domain: referrerDomain,
    source_channel: resolveSourceChannel(utmSource, referrerDomain),
    traffic_type: resolveTrafficType(),
  };

  const utmMedium = getQueryParamValue("utm_medium");
  const utmCampaign = getQueryParamValue("utm_campaign");
  const utmContent = getQueryParamValue("utm_content");
  const utmTerm = getQueryParamValue("utm_term");

  if (utmSource != null) {
    context.utm_source = utmSource;
  }

  if (utmMedium != null) {
    context.utm_medium = utmMedium;
  }

  if (utmCampaign != null) {
    context.utm_campaign = utmCampaign;
  }

  if (utmContent != null) {
    context.utm_content = utmContent;
  }

  if (utmTerm != null) {
    context.utm_term = utmTerm;
  }

  return context;
};
