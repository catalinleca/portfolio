import { SectionShell } from "@/ui/shared";
import { capabilities } from "../content";
import styles from "./Capabilities.module.css";

export const Capabilities = () => {
  return (
    <SectionShell id="about" label="capabilities">
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
    </SectionShell>
  );
};
