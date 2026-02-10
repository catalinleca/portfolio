import styles from "./SectionLabel.module.css";

interface SectionLabelProps {
  label: string;
}

export function SectionLabel({ label }: SectionLabelProps) {
  return (
    <div className={styles.label}>
      <span className={styles.hash}>#</span> {label}
    </div>
  );
}
