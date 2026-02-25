"use client";

import { useState, useSyncExternalStore } from "react";
import type { MouseEvent } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  getCookieConsentSnapshot,
  saveCookieConsent,
  subscribeToCookieConsent,
} from "@/privacy/cookieConsent";

const noOperation = () => {};
const subscribeToHydration = () => noOperation;
const DEFAULT_ANALYTICS_ENABLED = true;
const PRIVACY_PATH = "/privacy";
const COOKIES_HASH = "#cookies";

const normalizePathname = (value: string): string =>
  value.endsWith("/") && value.length > 1 ? value.slice(0, -1) : value;

interface CookieBannerState {
  activeAnalyticsState: boolean;
  hasDecision: boolean;
  isBannerVisible: boolean;
  isPreferencesOpen: boolean;
  isReady: boolean;
  isAnalyticsEnabled: boolean;
  shouldRenderStatusBadge: boolean;
}

interface CookieBannerActions {
  closePreferences: () => void;
  openPreferences: () => void;
  saveAllAndClose: () => void;
  saveEssentialsAndClose: () => void;
  saveCurrentPreferencesAndClose: () => void;
  toggleAnalytics: () => void;
  handleCookieDetailsClick: (event: MouseEvent<HTMLAnchorElement>) => void;
}

export interface UseCookieBannerStateResult {
  actions: CookieBannerActions;
  state: CookieBannerState;
}

export const useCookieBannerState = (): UseCookieBannerStateResult => {
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
  const shouldRenderStatusBadge = isPreferencesOpen || hasDecision;

  const closePreferences = () => {
    setIsPreferencesOpen(false);
  };

  const saveAndClose = (analyticsEnabled: boolean) => {
    saveCookieConsent(analyticsEnabled);
    setIsAnalyticsEnabled(analyticsEnabled);
    closePreferences();
  };

  const openPreferences = () => {
    setIsAnalyticsEnabled(consent?.analytics ?? DEFAULT_ANALYTICS_ENABLED);
    setIsPreferencesOpen(true);
  };

  const syncCookiesHash = () => {
    if (window.location.hash === COOKIES_HASH) {
      window.history.replaceState({}, "", PRIVACY_PATH);
    }

    window.history.replaceState({}, "", `${PRIVACY_PATH}${COOKIES_HASH}`);
  };

  const handleCookieDetailsClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const currentPath = normalizePathname(pathname);
    if (currentPath !== PRIVACY_PATH) {
      return;
    }

    event.preventDefault();

    const cookieSection = document.getElementById("cookies");
    if (cookieSection == null) {
      router.push(`${PRIVACY_PATH}${COOKIES_HASH}`);
      return;
    }

    cookieSection.scrollIntoView({ behavior: "smooth", block: "start" });
    syncCookiesHash();
  };

  return {
    state: {
      activeAnalyticsState,
      hasDecision,
      isBannerVisible,
      isPreferencesOpen,
      isReady: isHydrated,
      isAnalyticsEnabled,
      shouldRenderStatusBadge,
    },
    actions: {
      closePreferences,
      openPreferences,
      saveAllAndClose: () => saveAndClose(true),
      saveEssentialsAndClose: () => saveAndClose(false),
      saveCurrentPreferencesAndClose: () => saveAndClose(isAnalyticsEnabled),
      toggleAnalytics: () => setIsAnalyticsEnabled((value) => !value),
      handleCookieDetailsClick,
    },
  };
};
