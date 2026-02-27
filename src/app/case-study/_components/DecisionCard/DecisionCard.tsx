import type { ReactNode } from "react";
import styles from "./DecisionCard.module.css";

interface DecisionCardProps {
  id?: string;
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  variant?: "breakout";
}

export const DecisionCard = ({
  id,
  title,
  children,
  defaultOpen = false,
  variant,
}: DecisionCardProps) => {
  const className =
    variant === "breakout"
      ? `${styles.card} ${styles.breakoutCard}`
      : styles.card;

  return (
    <details id={id} className={className} open={defaultOpen || undefined}>
      <summary className={styles.summary}>
        <span className={styles.title}>{title}</span>
        <span className={styles.chevron} aria-hidden="true" />
      </summary>
      <div className={styles.content}>{children}</div>
    </details>
  );
};
