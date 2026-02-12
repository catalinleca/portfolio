export const hedgehuntTags = [
  "react-19",
  "typescript",
  "mui-v6",
  "tanstack-query",
  "google-maps",
  "edge-computing",
];

export const capabilities = [
  "Architecture & system design for multi-service platforms",
  "Performance-critical UIs — editors, maps, real-time previews",
  "Type-safe API contracts and comprehensive test coverage",
  "CI/CD pipelines, monorepo tooling, and developer experience",
  "Turning ambiguous requirements into shipped, maintainable products",
];

export interface ExperienceEntry {
  role: string;
  company: string;
  period: string;
  logo?: string;
}

export const experience: ExperienceEntry[] = [
  {
    role: "Software Engineer",
    company: "Trading 212",
    period: "2025 — now",
  },
  {
    role: "Senior Software Engineer",
    company: "Cybersecurity Platform",
    period: "2022 — 2025",
  },
  {
    role: "Software Engineer",
    company: "EdTech / CMS Products",
    period: "2020 — 2022",
  },
  {
    role: "Software Developer",
    company: "Agency & Freelance",
    period: "2018 — 2020",
  },
];

export const aboutMe = [
  "I care a lot about the work itself. I like building things, improving them, and seeing them used. I tend to do my best work in environments that are challenging but well run, where decisions are made, tools make sense, and time is respected.",
  "I'm comfortable working autonomously and taking ownership end to end, but I don't work in isolation. I enjoy collaborating, thinking out loud, and being direct when something feels off or could be better. I don't need endless meetings. Clarity and trust go a long way.",
  "Teams matter to me more than titles or org charts. I try to think in terms of how this helps the team, whether that's unblocking someone, improving a process, or pushing a bit further to make something cleaner than initially planned. I'm often the person who finds time in a sprint to fix, simplify, or suggest an improvement, even when it wasn't explicitly asked for.",
];

export const howIWork = [
  "Ship small, validate fast. Every PR should be deployable on its own",
  "Type boundaries, not interiors. Contracts at the edges, pragmatism inside",
  "Automate what repeats. CI, linting, and testing catch what humans miss",
  "Write for the next reader. Clear naming and structure over clever abstractions",
];

export const contactLinks = [
  { label: "catalin@catalinleca.dev", href: "mailto:catalin@catalinleca.dev" },
  {
    label: "linkedin.com/in/catalinleca",
    href: "https://linkedin.com/in/catalinleca",
    external: true,
  },
  {
    label: "github.com/catalinleca",
    href: "https://github.com/catalinleca",
    external: true,
  },
];
