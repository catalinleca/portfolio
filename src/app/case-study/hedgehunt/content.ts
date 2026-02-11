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
    "A deep dive into building a full-stack treasure hunt platform — architecture, technical decisions, and patterns.",
};

export const hedgehuntSections: CaseStudySection[] = [
  { id: "overview", label: "Overview" },
  { id: "architecture", label: "Architecture" },
  { id: "decisions", label: "Decisions" },
  { id: "patterns", label: "Patterns" },
  { id: "what-id-do-next", label: "What I'd Do Next" },
  { id: "numbers", label: "Numbers" },
];
