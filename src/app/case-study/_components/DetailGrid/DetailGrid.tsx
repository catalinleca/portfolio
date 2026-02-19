import type { ReactNode } from "react";
import styles from "./DetailGrid.module.css";

interface DetailGridProps {
  children: ReactNode;
}

export const DetailGrid = ({ children }: DetailGridProps) => {
  return <dl className={styles.grid}>{children}</dl>;
};
