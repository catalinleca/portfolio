import type { ReactNode } from "react";
import styles from "./Highlight.module.css";

interface HighlightCardProps {
  title: string;
  children: ReactNode;
}

export const HighlightCard = ({ title, children }: HighlightCardProps) => {
  return (
    <div className={styles.card}>
      <h4 className={styles.title}>{title}</h4>
      <div className={styles.body}>{children}</div>
    </div>
  );
};
