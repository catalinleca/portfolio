import { SectionShell } from "@/ui/shared";
import { CaseStudyCard } from "./CaseStudyCard";

export const CaseStudies = () => {
  return (
    <SectionShell id="work" label="featured work" noBorder>
      <CaseStudyCard />
    </SectionShell>
  );
};
