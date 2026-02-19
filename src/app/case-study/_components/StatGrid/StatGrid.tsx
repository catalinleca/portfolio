import type { ReactNode } from "react";
import styles from "./StatGrid.module.css";

interface StatGridProps {
  children: ReactNode;
}

export const StatGrid = ({ children }: StatGridProps) => {
  return <div className={styles.grid}>{children}</div>;
};

interface StatProps {
  value: string;
  label: string;
}

export const Stat = ({ value, label }: StatProps) => {
  return (
    <div className={styles.stat}>
      <span className={styles.value}>{value}</span>
      <span className={styles.label}>{label}</span>
    </div>
  );
};
