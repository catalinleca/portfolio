import type { ReactNode } from "react";
import styles from "./ProcessFlow.module.css";

interface ProcessFlowProps {
  title: string;
  children: ReactNode;
}

export const ProcessFlow = ({ title, children }: ProcessFlowProps) => {
  return (
    <div className={styles.flow}>
      <h4 className={styles.title}>{title}</h4>
      <div className={styles.steps}>{children}</div>
    </div>
  );
};

interface ProcessStepProps {
  label: string;
  detail?: string;
}

export const ProcessStep = ({ label, detail }: ProcessStepProps) => {
  return (
    <div className={styles.step}>
      <span className={styles.label}>{label}</span>
      {detail && <span className={styles.detail}>{detail}</span>}
    </div>
  );
};
