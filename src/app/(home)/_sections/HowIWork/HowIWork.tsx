import { SectionShell } from "@/ui/shared";
import { howIWork } from "../content";
import styles from "./HowIWork.module.css";

export const HowIWork = () => {
  return (
    <SectionShell label="how I work">
      <h2 className={styles.heading}>Operating principles</h2>
      <div className={styles.body}>
        {howIWork.map((paragraph) => (
          <p key={paragraph.slice(0, 20)} className={styles.paragraph}>
            {paragraph}
          </p>
        ))}
      </div>
    </SectionShell>
  );
};
