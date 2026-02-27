import type { ReactNode } from "react";
import styles from "./DecisionCard.module.css";

interface CardSectionProps {
  children: ReactNode;
}

export const CardSection = ({ children }: CardSectionProps) => (
  <div className={styles.section}>{children}</div>
);
