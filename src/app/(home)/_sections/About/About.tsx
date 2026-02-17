import { SectionShell } from "@/ui/shared";
import { aboutMe, howIWork } from "../content";
import styles from "./About.module.css";

export const About = () => {
  return (
    <SectionShell id="about" label="about me">
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
      <div className={styles.principles}>
        <h3 className={styles.principlesHeading}>Operating principles</h3>
        <ul className={styles.principlesList}>
          {howIWork.map((item) => (
            <li key={item} className={styles.principlesItem}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </SectionShell>
  );
};
