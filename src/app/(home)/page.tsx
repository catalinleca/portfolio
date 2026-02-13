import {
  Hero,
  About,
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
          <CaseStudies />
        </SectionReveal>

        <SectionReveal>
          <About />
        </SectionReveal>

        <SectionReveal>
          <Capabilities />
        </SectionReveal>

        <SectionReveal>
          <Experience />
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
