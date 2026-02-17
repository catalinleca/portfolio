import type { ReactNode } from "react";
import styles from "./CodeShowcase.module.css";

interface CodeShowcaseProps {
  title: string;
  description: string;
  children: ReactNode;
}

export const CodeShowcase = ({
  title,
  description,
  children,
}: CodeShowcaseProps) => {
  return (
    <div className={styles.showcase}>
      <div className={styles.header}>
        <h4 className={styles.title}>{title}</h4>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.code}>{children}</div>
    </div>
  );
};
