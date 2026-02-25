import styles from "./CookieBanner.module.css";

interface CookieBannerPreferenceActionsProps {
  onSavePreferences: () => void;
  onAcceptAll: () => void;
  onAcceptEssentials: () => void;
}

export const CookieBannerPreferenceActions = ({
  onSavePreferences,
  onAcceptAll,
  onAcceptEssentials,
}: CookieBannerPreferenceActionsProps) => {
  return (
    <div className={`${styles.actions} ${styles.preferencesActions}`}>
      <button
        type="button"
        className={`${styles.btnGhost} ${styles.btnSubtle}`}
        onClick={onAcceptEssentials}
      >
        Essentials only
      </button>
      <button type="button" className={`${styles.btnGhost} ${styles.btnAffirm}`} onClick={onAcceptAll}>
        Accept all
      </button>
      <button type="button" className={styles.btnPrimary} onClick={onSavePreferences}>
        Save preferences
      </button>
    </div>
  );
};
