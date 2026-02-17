import type { ReactNode } from "react";
import { SectionLabel } from "../SectionLabel";
import styles from "./SectionShell.module.css";

interface SectionShellProps {
  id?: string;
  label?: string;
  children: ReactNode;
  className?: string;
}

export const SectionShell = ({
  id,
  label,
  children,
  className,
}: SectionShellProps) => {
  const sectionClass = [
    styles.section,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section id={id} className={sectionClass}>
      {label && <SectionLabel label={label} />}
      {children}
    </section>
  );
};
