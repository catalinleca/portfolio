import { SectionShell } from "@/ui/shared";
import { aboutMe } from "../content";
import styles from "./About.module.css";

export const About = () => {
  return (
    <SectionShell id="about" label="about me" noBorder>
      <div className={styles.body}>
        {aboutMe.map((paragraph, i) => (
          <p
            key={paragraph.slice(0, 20)}
            className={i === 0 ? styles.lead : styles.paragraph}
          >
            {paragraph}
          </p>
        ))}
      </div>
    </SectionShell>
  );
};
