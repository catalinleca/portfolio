import styles from "./DetailGrid.module.css";

interface DetailItemProps {
  label: string;
  description: string;
}

export const DetailItem = ({ label, description }: DetailItemProps) => {
  return (
    <div className={styles.item}>
      <dt className={styles.term}>{label}</dt>
      <dd className={styles.definition}>{description}</dd>
    </div>
  );
};
