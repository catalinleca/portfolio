"use client";

import { useState, useEffect, useRef } from "react";
import {
  trackCaseStudySectionNavClicked,
  trackCaseStudySectionViewed,
} from "@/analytics";
import styles from "./SectionNav.module.css";

interface Section {
  id: string;
  label: string;
}

interface SectionNavProps {
  sections: Section[];
}

const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const SectionNav = ({ sections }: SectionNavProps) => {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");
  const viewedSectionsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    for (const section of sections) {
      const el = document.getElementById(section.id);
      if (!el) continue;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) {
            return
          };

          setActiveId(section.id);

          if (!viewedSectionsRef.current.has(section.id)) {
            viewedSectionsRef.current.add(section.id);
            trackCaseStudySectionViewed(section.id);
          }
        },
        { rootMargin: "-120px 0px -60% 0px", threshold: 0 },
      );

      observer.observe(el);
      observers.push(observer);
    }

    return () => {
      for (const observer of observers) {
        observer.disconnect();
      }
    };
  }, [sections]);

  const trackCaseStudySectionNavClickedAndScroll = (id: string) => {
    trackCaseStudySectionNavClicked(id);

    const el = document.getElementById(id);
    if (!el) return;

    el.scrollIntoView({
      behavior: prefersReducedMotion ? "instant" : "smooth",
      block: "start",
    });
  };

  return (
    <nav className={styles.nav} aria-label="Case study sections">
      <ul className={styles.list}>
        {sections.map((section) => (
          <li key={section.id}>
            <button
              className={`${styles.link} ${activeId === section.id ? styles.active : ""}`}
              onClick={() => trackCaseStudySectionNavClickedAndScroll(section.id)}
              type="button"
            >
              {section.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
