import styles from "./CookieBanner.module.css";
import { CookieBannerPreferenceActions } from "./CookieBannerPreferenceActions";
import { CookieBannerPreferenceLinks } from "./CookieBannerPreferenceLinks";
import { CookieBannerPreferenceRows } from "./CookieBannerPreferenceRows";
import type { CookieBannerPreferencesPanelProps } from "./types";

export const CookieBannerPreferencesPanel = ({
  isAnalyticsEnabled,
  onToggleAnalytics,
  onCookieDetailsClick,
  onSavePreferences,
  onAcceptAll,
  onAcceptEssentials,
}: CookieBannerPreferencesPanelProps) => {
  return (
    <div className={styles.preferences}>
      <CookieBannerPreferenceRows
        isAnalyticsEnabled={isAnalyticsEnabled}
        onToggleAnalytics={onToggleAnalytics}
      />
      <CookieBannerPreferenceLinks onCookieDetailsClick={onCookieDetailsClick} />
      <CookieBannerPreferenceActions
        onSavePreferences={onSavePreferences}
        onAcceptAll={onAcceptAll}
        onAcceptEssentials={onAcceptEssentials}
      />
    </div>
  );
};
