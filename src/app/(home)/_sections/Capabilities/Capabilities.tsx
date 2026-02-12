import { SectionShell } from "@/ui/shared";
import { capabilities } from "../content";
import styles from "./Capabilities.module.css";

export const Capabilities = () => {
  return (
    <SectionShell label="capabilities">
      <h2 className={styles.heading}>What I&apos;m usually trusted with</h2>
      <ul className={styles.list}>
        {capabilities.map((item) => (
          <li key={item} className={styles.item}>
            {item}
          </li>
        ))}
      </ul>
    </SectionShell>
  );
};
