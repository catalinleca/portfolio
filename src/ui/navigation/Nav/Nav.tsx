"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ANALYTICS_EVENTS } from "@/analytics";
import { ExternalLink, ScrollLink } from "@/ui/shared";
import styles from "./Nav.module.css";

const NAV_HEIGHT = "52px";

export const Nav = () => {
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const THRESHOLD = 10;

    const handleScroll = () => {
      const currentY = window.scrollY;

      if (Math.abs(currentY - lastScrollY.current) < THRESHOLD) {
        return;
      }

      const hidden = currentY > lastScrollY.current && currentY > 80;
      setIsHidden(hidden);
      document.documentElement.style.setProperty("--nav-offset", hidden ? "0px" : NAV_HEIGHT);
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
        <Link
          href="/"
          className={styles.logo}
          data-analytics-click={ANALYTICS_EVENTS.click}
          data-analytics-link-name="nav_logo"
          data-analytics-location="nav"
          data-analytics-section="nav"
        >
          Catalin Leca
        </Link>
        <div className={styles.links}>
          <ScrollLink
            href="#work"
            className={styles.link}
            data-analytics-click={ANALYTICS_EVENTS.click}
            data-analytics-link-name="nav_work"
            data-analytics-location="nav"
            data-analytics-section="nav"
          >
            work
          </ScrollLink>
          <ScrollLink
            href="#about"
            className={styles.link}
            data-analytics-click={ANALYTICS_EVENTS.click}
            data-analytics-link-name="nav_about"
            data-analytics-location="nav"
            data-analytics-section="nav"
          >
            about
          </ScrollLink>
          <ExternalLink
            href="/Catalin_Leca_Resume.pdf"
            className={`${styles.link} ${styles.resumeLink}`}
            data-analytics-click={ANALYTICS_EVENTS.click}
            data-analytics-link-name="nav_resume"
            data-analytics-location="nav"
            data-analytics-section="nav"
          >
            Resume
          </ExternalLink>
          <ScrollLink
            href="#contact"
            className={`${styles.link} ${styles.ctaLink}`}
            data-analytics-click={ANALYTICS_EVENTS.click}
            data-analytics-link-name="nav_lets_talk"
            data-analytics-location="nav"
            data-analytics-section="nav"
          >
            Let&apos;s Talk
          </ScrollLink>
        </div>
      </div>
    </nav>
  );
};
