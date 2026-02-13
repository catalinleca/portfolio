import Image from "next/image";
import { SectionShell } from "@/ui/shared";
import { companies } from "../content";
import { CaseStudyCard } from "./CaseStudyCard";
import styles from "./CaseStudies.module.css";

export const CaseStudies = () => {
  return (
    <SectionShell id="work" label="featured work">
      <CaseStudyCard />
      <div className={styles.logoStrip}>
        {companies.map((company) => (
          <Image
            key={company.name}
            src={company.logo}
            alt={company.name}
            width={120}
            height={32}
            className={styles.logo}
          />
        ))}
      </div>
    </SectionShell>
  );
};
