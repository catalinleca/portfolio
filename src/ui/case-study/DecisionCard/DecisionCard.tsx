import type { ReactNode } from "react";
import styles from "./DecisionCard.module.css";

interface DecisionCardProps {
  id?: string;
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export const DecisionCard = ({
  id,
  title,
  children,
  defaultOpen = false,
}: DecisionCardProps) => {
  return (
    <details id={id} className={styles.card} open={defaultOpen || undefined}>
      <summary className={styles.summary}>
        <span className={styles.title}>{title}</span>
        <span className={styles.chevron} aria-hidden="true" />
      </summary>
      <div className={styles.content}>{children}</div>
    </details>
  );
};
