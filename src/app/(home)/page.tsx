import {
  Hero,
  Capabilities,
  Experience,
  CaseStudies,
  HowIWork,
  Contact,
} from "./_sections";
import { Footer } from "@/ui/layout";
import { PageTransition, SectionReveal } from "@/ui/motion";
import styles from "./page.module.css";

export default function Home() {
  return (
    <PageTransition>
      <main className={styles.main}>
        <Hero />

        <SectionReveal>
          <Capabilities />
        </SectionReveal>

        <SectionReveal>
          <Experience />
        </SectionReveal>

        <SectionReveal>
          <CaseStudies />
        </SectionReveal>

        <SectionReveal>
          <HowIWork />
        </SectionReveal>

        <SectionReveal>
          <Contact />
        </SectionReveal>
      </main>
      <Footer />
    </PageTransition>
  );
}
