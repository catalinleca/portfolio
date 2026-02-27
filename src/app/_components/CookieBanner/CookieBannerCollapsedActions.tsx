import styles from "./CookieBanner.module.css";

interface CookieBannerCollapsedActionsProps {
  onAcceptAll: () => void;
  onAcceptEssentials: () => void;
  onManagePreferences: () => void;
}

export const CookieBannerCollapsedActions = ({
  onAcceptAll,
  onAcceptEssentials,
  onManagePreferences,
}: CookieBannerCollapsedActionsProps) => {
  return (
    <div className={styles.actions}>
      <button
        type="button"
        className={`${styles.btnGhost} ${styles.btnSubtle}`}
        onClick={onAcceptEssentials}
      >
        Accept essentials
      </button>
      <button
        type="button"
        className={`${styles.btnGhost} ${styles.btnAffirm}`}
        onClick={onManagePreferences}
      >
        Manage preferences
      </button>
      <button type="button" className={styles.btnPrimary} onClick={onAcceptAll}>
        Accept all
      </button>
    </div>
  );
};
