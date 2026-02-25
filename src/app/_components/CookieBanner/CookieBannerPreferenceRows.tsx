import styles from "./CookieBanner.module.css";

interface CookieBannerPreferenceRowsProps {
  isAnalyticsEnabled: boolean;
  onToggleAnalytics: () => void;
}

export const CookieBannerPreferenceRows = ({
  isAnalyticsEnabled,
  onToggleAnalytics,
}: CookieBannerPreferenceRowsProps) => {
  return (
    <>
      <div className={styles.preferenceRow}>
        <div>
          <p className={styles.preferenceName}>Essential cookies</p>
          <p className={styles.preferenceHint}>Required for site operation.</p>
        </div>
        <span className={styles.locked}>Always on</span>
      </div>

      <div className={styles.preferenceRow}>
        <div>
          <p className={styles.preferenceName}>Analytics cookies</p>
          <p className={styles.preferenceHint}>Anonymous usage insights via PostHog.</p>
        </div>
        <button
          type="button"
          role="switch"
          aria-label="Toggle analytics cookies"
          aria-checked={isAnalyticsEnabled}
          className={`${styles.switch} ${isAnalyticsEnabled ? styles.switchOn : ""}`}
          onClick={onToggleAnalytics}
        >
          <span className={styles.switchThumb} />
        </button>
      </div>
    </>
  );
};
