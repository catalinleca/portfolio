import { SectionShell } from "@/ui/shared";
import { howIWork } from "../content";
import styles from "./HowIWork.module.css";

export const HowIWork = () => {
  return (
    <SectionShell label="how I work">
      <h2 className={styles.heading}>Operating principles</h2>
      <ul className={styles.list}>
        {howIWork.map((item) => (
          <li key={item} className={styles.item}>
            {item}
          </li>
        ))}
      </ul>
    </SectionShell>
  );
};
