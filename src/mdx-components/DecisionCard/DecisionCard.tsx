import styles from "./DecisionCard.module.css";

interface DecisionCardProps {
  title: string;
  context: string;
  decision: string;
  tradeoff: string;
  defaultOpen?: boolean;
}

export const DecisionCard = ({
  title,
  context,
  decision,
  tradeoff,
  defaultOpen = false,
}: DecisionCardProps) => {
  return (
    <details className={styles.card} open={defaultOpen || undefined}>
      <summary className={styles.summary}>
        <span className={styles.title}>{title}</span>
        <span className={styles.chevron} aria-hidden="true" />
      </summary>
      <div className={styles.content}>
        <div className={styles.field}>
          <span className={styles.fieldLabel}>Context</span>
          <p className={styles.fieldValue}>{context}</p>
        </div>
        <div className={styles.field}>
          <span className={styles.fieldLabel}>Decision</span>
          <p className={styles.fieldValue}>{decision}</p>
        </div>
        <div className={styles.field}>
          <span className={styles.fieldLabel}>Trade-off</span>
          <p className={styles.fieldValue}>{tradeoff}</p>
        </div>
      </div>
    </details>
  );
};
