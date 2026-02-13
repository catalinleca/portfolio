"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ExternalLink } from "@/ui/shared";
import styles from "./Nav.module.css";

export function Nav() {
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const THRESHOLD = 10;

    const handleScroll = () => {
      const currentY = window.scrollY;

      if (Math.abs(currentY - lastScrollY.current) < THRESHOLD) {
        return;
      }

      setIsHidden(currentY > lastScrollY.current && currentY > 80);
      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={`${styles.nav} ${isHidden ? styles.hidden : ""}`}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          Catalin Leca
        </Link>
        <div className={styles.links}>
          <Link href="/#work" className={styles.link}>
            work
          </Link>
          <Link href="/#about" className={styles.link}>
            about
          </Link>
          <ExternalLink
            href="/resume.pdf"
            className={`${styles.link} ${styles.resumeLink}`}
          >
            resume.pdf
          </ExternalLink>
          <Link href="/#contact" className={`${styles.link} ${styles.ctaLink}`}>
            Let&apos;s Talk
          </Link>
        </div>
      </div>
    </nav>
  );
}
