import type { ReactNode } from "react";
import styles from "./DecisionCard.module.css";

interface DecisionCardProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export const DecisionCard = ({
  title,
  children,
  defaultOpen = false,
}: DecisionCardProps) => {
  return (
    <details className={styles.card} open={defaultOpen || undefined}>
      <summary className={styles.summary}>
        <span className={styles.title}>{title}</span>
        <span className={styles.chevron} aria-hidden="true" />
      </summary>
      <div className={styles.content}>{children}</div>
    </details>
  );
};
