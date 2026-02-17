export interface CaseStudySection {
  id: string;
  label: string;
}

export interface CaseStudyMeta {
  title: string;
  description: string;
}

export const hedgehuntMeta: CaseStudyMeta = {
  title: "HedgeHunt Case Study — Catalin Leca",
  description:
    "Architecture and technical decisions behind a full-stack treasure hunt platform.",
};

export const hedgehuntSections: CaseStudySection[] = [
  { id: "overview", label: "Overview" },
  { id: "architecture", label: "Architecture" },
  { id: "decisions", label: "Decisions" },
  { id: "highlights", label: "Highlights" },
  { id: "reflections", label: "Reflections" },
  { id: "numbers", label: "Numbers" },
  { id: "links", label: "Links" },
];
