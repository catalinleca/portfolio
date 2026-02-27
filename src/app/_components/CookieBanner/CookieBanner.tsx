"use client";

import { CookieBannerCollapsedActions } from "./CookieBannerCollapsedActions";
import { CookieBannerHeader } from "./CookieBannerHeader";
import { CookieBannerPreferences } from "./CookieBannerPreferences";
import { useCookieBannerState } from "./useCookieBannerState";
import styles from "./CookieBanner.module.css";

const hasAnalyticsKey = (process.env.NEXT_PUBLIC_POSTHOG_KEY ?? "").length > 0;

export const CookieBanner = () => {
  const { actions, state, bannerRef } = useCookieBannerState();

  if (!hasAnalyticsKey || !state.isReady) {
    return null;
  }

  if (!state.isBannerVisible) {
    return (
      <button type="button" className={styles.settingsButton} onClick={actions.openPreferences}>
        Cookie settings
      </button>
    );
  }

  return (
    <aside ref={bannerRef} className={styles.banner} role="dialog" aria-label="Cookie preferences">
      <CookieBannerHeader
        isPreferencesOpen={state.isPreferencesOpen}
        hasDecision={state.hasDecision}
        shouldRenderStatusBadge={state.shouldRenderStatusBadge}
        isAnalyticsEnabled={state.activeAnalyticsState}
        onClosePreferences={actions.closePreferences}
      />

      {!state.isPreferencesOpen && (
        <CookieBannerCollapsedActions
          onAcceptAll={actions.saveAllAndClose}
          onAcceptEssentials={actions.saveEssentialsAndClose}
          onManagePreferences={actions.openPreferences}
        />
      )}

      {state.isPreferencesOpen && (
        <CookieBannerPreferences
          isAnalyticsEnabled={state.isAnalyticsEnabled}
          onToggleAnalytics={actions.toggleAnalytics}
          onCookieDetailsClick={actions.handleCookieDetailsClick}
          onSavePreferences={actions.saveCurrentPreferencesAndClose}
          onAcceptAll={actions.saveAllAndClose}
          onAcceptEssentials={actions.saveEssentialsAndClose}
        />
      )}
    </aside>
  );
};
