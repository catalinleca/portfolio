import styles from "./TechTag.module.css";

interface TechTagProps {
  label: string;
}

export function TechTag({ label }: TechTagProps) {
  return <span className={styles.tag}>{label}</span>;
}
