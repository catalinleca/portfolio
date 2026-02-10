import styles from "./Experience.module.css";

const experience = [
  {
    role: "Senior Frontend Engineer",
    company: "Zafran",
    context: "Cybersecurity",
    period: "2024 – 2025",
  },
  {
    role: "Senior Frontend Engineer",
    company: "Trading 212",
    period: "2023 – 2024",
  },
  {
    role: "Frontend Engineer",
    company: "EF Education First",
    period: "2022 – 2023",
  },
  {
    role: "Frontend Engineer",
    company: "Financial Times",
    period: "2021 – 2022",
  },
  {
    role: "Frontend Engineer",
    company: "Vodafone",
    period: "2019 – 2021",
  },
];

export const Experience = () => {
  return (
    <div className={styles.section}>
      <h2 className={styles.heading}>Experience</h2>
      <div className={styles.list}>
        {experience.map((entry) => (
          <div key={entry.company} className={styles.entry}>
            <div>
              <p className={styles.role}>
                {entry.role}{" "}
                <span className={styles.company}>
                  — {entry.company}
                  {entry.context ? ` (${entry.context})` : ""}
                </span>
              </p>
            </div>
            <span className={styles.period}>{entry.period}</span>
          </div>
        ))}
      </div>
      <a href="/resume.pdf" className={styles.resumeLink}>
        Full resume &rarr;
      </a>
    </div>
  );
};
