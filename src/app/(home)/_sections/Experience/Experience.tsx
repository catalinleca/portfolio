import Image from "next/image";
import { SectionShell } from "@/ui/shared";
import { experience } from "../content";
import styles from "./Experience.module.css";

export const Experience = () => {
  return (
    <SectionShell id="experience" label="experience">
      <div className={styles.list}>
        {experience.map((entry) => (
          <div key={entry.company} className={styles.entry}>
            {entry.logo ? (
              <Image
                src={entry.logo}
                alt={entry.company}
                width={32}
                height={32}
                className={styles.logoImage}
              />
            ) : (
              <div className={styles.logoPlaceholder} />
            )}
            <span className={styles.role}>{entry.role}</span>
            <span className={styles.separator}>·</span>
            <span className={styles.company}>{entry.company}</span>
            <span className={styles.separator}>·</span>
            <span className={styles.period}>{entry.period}</span>
          </div>
        ))}
      </div>
    </SectionShell>
  );
};
