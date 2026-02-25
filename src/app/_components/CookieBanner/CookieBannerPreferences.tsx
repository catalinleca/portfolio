import type { MouseEventHandler } from "react";
import styles from "./CookieBanner.module.css";
import { CookieBannerPreferenceActions } from "./CookieBannerPreferenceActions";
import { CookieBannerPreferenceLinks } from "./CookieBannerPreferenceLinks";
import { CookieBannerPreferenceRows } from "./CookieBannerPreferenceRows";

interface CookieBannerPreferencesProps {
  isAnalyticsEnabled: boolean;
  onToggleAnalytics: () => void;
  onCookieDetailsClick: MouseEventHandler<HTMLAnchorElement>;
  onSavePreferences: () => void;
  onAcceptAll: () => void;
  onAcceptEssentials: () => void;
}

export const CookieBannerPreferences = ({
  isAnalyticsEnabled,
  onToggleAnalytics,
  onCookieDetailsClick,
  onSavePreferences,
  onAcceptAll,
  onAcceptEssentials,
}: CookieBannerPreferencesProps) => {
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
