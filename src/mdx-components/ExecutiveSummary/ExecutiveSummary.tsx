import styles from "./ExecutiveSummary.module.css";

interface ExecutiveSummaryProps {
  problem: string;
  constraints: string;
  architecture: string;
  results: string;
}

export const ExecutiveSummary = ({
  problem,
  constraints,
  architecture,
  results,
}: ExecutiveSummaryProps) => {
  return (
    <div className={styles.grid}>
      <div className={styles.cell}>
        <h3 className={styles.label}>Problem</h3>
        <p className={styles.value}>{problem}</p>
      </div>
      <div className={styles.cell}>
        <h3 className={styles.label}>Constraints</h3>
        <p className={styles.value}>{constraints}</p>
      </div>
      <div className={styles.cell}>
        <h3 className={styles.label}>Architecture</h3>
        <p className={styles.value}>{architecture}</p>
      </div>
      <div className={styles.cell}>
        <h3 className={styles.label}>Results</h3>
        <p className={styles.value}>{results}</p>
      </div>
    </div>
  );
};
