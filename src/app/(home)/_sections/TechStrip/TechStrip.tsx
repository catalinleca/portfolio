import { techStack } from "../content";
import styles from "./TechStrip.module.css";

export const TechStrip = () => {
  return (
    <div className={styles.strip}>
      <div className={styles.track} aria-hidden="true">
        {[...techStack, ...techStack].map((item, i) => (
          <span key={`${item}-${i}`} className={styles.item}>
            <span className={styles.dot} />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};
