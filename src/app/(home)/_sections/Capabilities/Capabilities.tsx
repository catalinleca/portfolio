import { SectionLabel } from "@/ui/shared";
import styles from "./Capabilities.module.css";

const capabilities = [
  {
    num: "01",
    title: "Architecture & System Design",
    description:
      "Multi-service platforms, monorepo structures, shared packages, API boundaries. I design systems that scale without drowning in complexity.",
  },
  {
    num: "02",
    title: "Performance-Critical UIs",
    description:
      "Editor interfaces, real-time previews, drag-and-drop, map-based experiences. Complex interactions that stay fast under load.",
  },
  {
    num: "03",
    title: "Quality & Delivery",
    description:
      "Type-safe API contracts, comprehensive test coverage, CI/CD pipelines. I ship reliably because the systems I build are designed to be shipped.",
  },
];

export const Capabilities = () => {
  return (
    <section id="about" className={styles.section}>
      <SectionLabel label="capabilities" />
      <div className={styles.layout}>
        <div className={styles.left}>
          <h2 className={styles.heading}>
            What I
            <br />
            bring to
            <br />a team
          </h2>
          <p className={styles.aside}>
            I don&apos;t just build features. I build the systems that make
            features possible — and the decisions that keep them maintainable.
          </p>
        </div>
        <div className={styles.right}>
          {capabilities.map((cap) => (
            <div key={cap.num} className={styles.row}>
              <span className={styles.num}>{cap.num}</span>
              <div>
                <h3 className={styles.capTitle}>{cap.title}</h3>
                <p className={styles.capDesc}>{cap.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
