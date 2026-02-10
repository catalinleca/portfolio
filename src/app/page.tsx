import { Hero, CaseStudies, Clients, Capabilities, Experience, Contact } from "@/components/home";
import { Footer } from "@/components/layout";
import { PageTransition, SectionReveal } from "@/components/motion";
import styles from "./page.module.css";

export default function Home() {
  return (
    <PageTransition>
      <main className={styles.main}>
        <SectionReveal>
          <Hero />
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <CaseStudies />
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <Clients />
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <Capabilities />
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <Experience />
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <Contact />
        </SectionReveal>
      </main>
      <Footer />
    </PageTransition>
  );
}
