import { ExternalLink } from "@/ui/shared";
import { heroStats } from "../content";
import styles from "./Hero.module.css";

export const Hero = () => {
  return (
    <header className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.eyebrow}>Senior Software Engineer</div>
          <h1 className={styles.headline}>
            I build complex platforms
            <br />
            that <em>ship&nbsp;clean.</em>
          </h1>
          <p className={styles.subtitle}>
            <strong>7+ years of React.</strong> Currently building React Native
            at <strong>Trading 212</strong>. I specialize in multi-service
            architectures, performance-critical UIs, and products that survive
            contact with real users.
          </p>
        </div>
        <div className={styles.bottom}>
          <div className={styles.actions}>
            <div className={styles.btns}>
              <ExternalLink
                href="/resume.pdf"
                className={`${styles.btn} ${styles.btnAccent}`}
              >
                Download Resume
              </ExternalLink>
              <ExternalLink
                href="https://github.com/catalinleca"
                className={styles.btn}
              >
                GitHub
              </ExternalLink>
              <ExternalLink
                href="https://linkedin.com/in/catalinleca"
                className={styles.btn}
              >
                LinkedIn
              </ExternalLink>
              <a href="mailto:catalin@catalinleca.dev" className={styles.btn}>
                Email
              </a>
            </div>
            <ul className={styles.proof}>
              <li className={styles.proofItem}>
                Reduced system vulnerabilities <strong>90%</strong> at the
                Financial Times
              </li>
              <li className={styles.proofItem}>
                Rearchitected a legacy CMS into a{" "}
                <strong>modular React system</strong> at Education First
              </li>
              <li className={styles.proofItem}>
                Solo-built a <strong>5-service platform</strong> with 217
                automated tests — live at hedgehunt.app
              </li>
            </ul>
          </div>
          <div className={styles.numbers}>
            {heroStats.map((card) => (
              <div
                key={card.val}
                className={styles.numberCard}
                data-color={card.color}
              >
                <span className={styles.numberVal}>{card.val}</span>
                <span className={styles.numberLabel}>{card.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};
