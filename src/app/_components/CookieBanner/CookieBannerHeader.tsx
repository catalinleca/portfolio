import styles from "./CookieBanner.module.css";

interface CookieBannerHeaderProps {
  isPreferencesOpen: boolean;
  hasDecision: boolean;
  shouldRenderStatusBadge: boolean;
  isAnalyticsEnabled: boolean;
  onClosePreferences: () => void;
}

const getStatusLabel = (isAnalyticsEnabled: boolean): string =>
  isAnalyticsEnabled ? "Analytics enabled" : "Analytics disabled";

export const CookieBannerHeader = ({
  isPreferencesOpen,
  hasDecision,
  shouldRenderStatusBadge,
  isAnalyticsEnabled,
  onClosePreferences,
}: CookieBannerHeaderProps) => {
  return (
    <div className={styles.head}>
      <div className={styles.copy}>
        <p className={styles.title}>Cookie preferences</p>
        <p className={styles.description}>
          We use essential cookies for core site behavior. Analytics cookies are optional and help
          us understand how visitors use this portfolio.
        </p>
      </div>
      <div className={styles.headControls}>
        {shouldRenderStatusBadge && (
          <span
            className={`${styles.status} ${isAnalyticsEnabled ? styles.statusEnabled : styles.statusDisabled}`}
          >
            {getStatusLabel(isAnalyticsEnabled)}
          </span>
        )}
        {isPreferencesOpen && hasDecision && (
          <button
            type="button"
            aria-label="Close cookie preferences"
            className={styles.iconClose}
            onClick={onClosePreferences}
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};
