import type { ReactNode } from "react";
import styles from "./DecisionCard.module.css";

interface CardFieldProps {
  label: string;
  children: ReactNode;
}

export const CardField = ({ label, children }: CardFieldProps) => {
  return (
    <div className={styles.field}>
      <span className={styles.fieldLabel}>{label}</span>
      <div className={styles.fieldValue}>{children}</div>
    </div>
  );
};
