import type { ReactNode } from "react";
import styles from "./DecisionCard.module.css";

interface CardBreakoutProps {
  children: ReactNode;
}

export const CardBreakout = ({ children }: CardBreakoutProps) => (
  <div className={styles.breakout}>{children}</div>
);
