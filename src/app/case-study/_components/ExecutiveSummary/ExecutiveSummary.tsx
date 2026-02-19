import styles from "./ExecutiveSummary.module.css";

interface ExecutiveSummaryProps {
  product: string;
  challenge: string;
  approach: string;
  outcome: string;
}

export const ExecutiveSummary = ({
  product,
  challenge,
  approach,
  outcome,
}: ExecutiveSummaryProps) => {
  return (
    <div className={styles.grid}>
      <div className={styles.cell}>
        <h3 className={styles.label}>Product</h3>
        <p className={styles.value}>{product}</p>
      </div>
      <div className={styles.cell}>
        <h3 className={styles.label}>Challenge</h3>
        <p className={styles.value}>{challenge}</p>
      </div>
      <div className={styles.cell}>
        <h3 className={styles.label}>Approach</h3>
        <p className={styles.value}>{approach}</p>
      </div>
      <div className={styles.cell}>
        <h3 className={styles.label}>Outcome</h3>
        <p className={styles.value}>{outcome}</p>
      </div>
    </div>
  );
};
