import { Children, type ReactNode } from "react";
import { ArrowRightIcon } from "@/ui/icons";
import styles from "./ProcessFlow.module.css";

interface ProcessFlowProps {
  title: string;
  children: ReactNode;
}

export const ProcessFlow = ({ title, children }: ProcessFlowProps) => {
  const steps = Children.toArray(children);

  return (
    <div className={styles.flow}>
      <h4 className={styles.title}>{title}</h4>
      <div className={styles.steps}>
        {steps.map((step, i) => (
          <div key={i} className={styles.stepGroup}>
            {step}
            {i < steps.length - 1 && (
              <ArrowRightIcon className={styles.arrow} aria-hidden />
            )}
          </div>
        ))}
      </div>
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