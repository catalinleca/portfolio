import {
  Hero,
  About,
  CaseStudies,
  Contact,
} from "./_sections";
import { Footer } from "@/ui/layout";
import { PageTransition, SectionReveal } from "@/ui/motion";
import { ScrollLink } from "@/ui/shared";
import styles from "./page.module.css";

export default function Home() {
  return (
    <PageTransition>
      <main className={styles.main}>
        <Hero />

        <SectionReveal>
          <CaseStudies />
        </SectionReveal>

        <SectionReveal>
          <div className={styles.bridge}>
            <p className={styles.bridgeText}>
              Like what you see?
            </p>
            <ScrollLink href="#contact" className={styles.bridgeLink}>
              Let&apos;s talk →
            </ScrollLink>
          </div>
        </SectionReveal>

        <SectionReveal>
          <About />
        </SectionReveal>

        <SectionReveal>
          <Contact />
        </SectionReveal>
      </main>
      <Footer />
    </PageTransition>
  );
}
