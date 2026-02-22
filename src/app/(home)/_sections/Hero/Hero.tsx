import Image from "next/image";
import { trackClick } from "@/analytics";
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
            I care about how things are built.
          </h1>
          <p className={styles.intro}>
            I&apos;ve built production platforms end to end, from system
            design to deployment. I break hard problems into manageable pieces,
            adapt fast, and leave things in better shape than I found them.
          </p>
          <div className={styles.actions}>
            <ScrollLink
              href="#work"
              className={`${styles.btn} ${styles.btnAccent}`}
              {...trackClick("hero_view_work", "hero")}
            >
              View My Work
            </ScrollLink>
            <div className={styles.secondaryLinks}>
              <ExternalLink href="/Catalin_Leca_Resume.pdf" className={styles.btn} {...trackClick("hero_resume", "hero")}>
                Resume
              </ExternalLink>
              <ExternalLink href="https://github.com/catalinleca" className={styles.btn} {...trackClick("hero_github", "hero")}>
                GitHub
              </ExternalLink>
              <ExternalLink href="https://linkedin.com/in/catalinleca" className={styles.btn} {...trackClick("hero_linkedin", "hero")}>
                LinkedIn
              </ExternalLink>
              <CopyEmailBtn email={contactEmail} className={styles.btn} {...trackClick("hero_copy_email", "hero")} />
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
