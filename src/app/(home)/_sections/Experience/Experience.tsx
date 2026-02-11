import { SectionShell, ArrowLink } from "@/ui/shared";
import { experience } from "../content";
import styles from "./Experience.module.css";

export const Experience = () => {
  return (
    <SectionShell id="experience" label="experience">
      <div className={styles.layout}>
        <div className={styles.left}>
          <h2 className={styles.heading}>
            Where I&apos;ve
            <br />
            built things
          </h2>
        </div>
        <div className={styles.right}>
          <div className={styles.list}>
            {experience.map((entry) => (
              <div key={entry.company} className={styles.entry}>
                <div>
                  <span className={styles.role}>{entry.role}</span>
                  <span className={styles.company}> · {entry.company}</span>
                </div>
                <span className={styles.period}>{entry.period}</span>
              </div>
            ))}
          </div>
          <ArrowLink
            href="/resume.pdf"
            external
            className={styles.resumeLink}
          >
            Full resume
          </ArrowLink>
        </div>
      </div>
    </SectionShell>
  );
};
