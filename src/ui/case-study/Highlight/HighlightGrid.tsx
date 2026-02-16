import type { ReactNode } from "react";
import styles from "./Highlight.module.css";

interface HighlightGridProps {
  children: ReactNode;
}

export const HighlightGrid = ({ children }: HighlightGridProps) => {
  return <div className={styles.grid}>{children}</div>;
};
