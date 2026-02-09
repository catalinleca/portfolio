import { Hero } from "@/components/Hero";
import { CaseStudies } from "@/components/CaseStudies";
import { Clients } from "@/components/Clients";
import { Capabilities } from "@/components/Capabilities";
import { Experience } from "@/components/Experience";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { SectionReveal } from "@/components/SectionReveal";
import { PageTransition } from "@/components/PageTransition";
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
