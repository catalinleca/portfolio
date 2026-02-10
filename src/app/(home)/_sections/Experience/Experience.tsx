import { SectionLabel } from "@/ui/shared";
import styles from "./Experience.module.css";

const experience = [
  {
    role: "React Native Engineer",
    company: "Trading 212",
    period: "2025 — now",
  },
  {
    role: "Senior React Engineer",
    company: "Cybersecurity Platform",
    period: "2022 — 2025",
  },
  {
    role: "React Engineer",
    company: "EdTech / CMS Products",
    period: "2020 — 2022",
  },
  {
    role: "Frontend Developer",
    company: "Agency & Freelance",
    period: "2018 — 2020",
  },
];

export const Experience = () => {
  return (
    <section id="experience" className={styles.section}>
      <SectionLabel label="experience" />
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
          <a
            href="/resume.pdf"
            className={styles.resumeLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Full resume →
          </a>
        </div>
      </div>
    </section>
  );
};
