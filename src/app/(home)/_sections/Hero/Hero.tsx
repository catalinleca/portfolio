import Image from "next/image";
import { ExternalLink, ScrollLink } from "@/ui/shared";
import { contactEmail } from "../content";
import { CopyEmailBtn } from "./CopyEmailBtn";
import styles from "./Hero.module.css";

const CAREER_START = new Date(2018, 3, 1); // April 2018
const YEARS_EXPERIENCE = Math.floor(
  (Date.now() - CAREER_START.getTime()) / (365.25 * 24 * 60 * 60 * 1000)
);

export const Hero = () => {

  return (
    <header className={styles.hero}>
      <div className={styles.content}>
        <div className={styles.text}>
          <div className={styles.eyebrow}>Senior Software Engineer · {YEARS_EXPERIENCE}+ years</div>
          <h1 className={styles.headline}>
            Complexity is easy to create. Simplicity takes work.
          </h1>
          <p className={styles.intro}>
            I focus on shaping software so it stays clear, reliable, and easy to build on.
          </p>
          <div className={styles.actions}>
            <ScrollLink
              href="#work"
              className={`${styles.btn} ${styles.btnAccent}`}
            >
              View My Work
            </ScrollLink>
            <div className={styles.secondaryLinks}>
              <ExternalLink href="/Catalin_Leca_Resume.pdf" className={styles.btn}>
                Resume
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
              <CopyEmailBtn email={contactEmail} className={styles.btn} />
            </div>
          </div>
        </div>
        <div className={styles.photo}>
          <Image
            src="/images/me-photo.webp"
            alt="Catalin Leca"
            width={640}
            height={800}
            className={styles.photoImage}
            priority
          />
        </div>
      </div>
    </header>
  );
};
