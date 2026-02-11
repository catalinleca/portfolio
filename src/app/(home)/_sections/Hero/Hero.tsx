import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "@/ui/shared";
import styles from "./Hero.module.css";

export const Hero = () => {
  return (
    <header className={styles.hero}>
      <div className={styles.content}>
        <div className={styles.text}>
          <div className={styles.eyebrow}>Senior Software Engineer</div>
          <h1 className={styles.headline}>
            Complexity is easy to create. Simplicity takes work.
          </h1>
          <p className={styles.intro}>
            I focus on shaping software so it stays clear, reliable, and easy to build on.
          </p>
          <div className={styles.btns}>
            <Link
              href="/case-study/hedgehunt"
              className={`${styles.btn} ${styles.btnAccent}`}
            >
              View Case Study
            </Link>
            <ExternalLink href="/resume.pdf" className={styles.btn}>
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
            <a href="mailto:catalin@catalinleca.dev" className={styles.btn}>
              Email
            </a>
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
