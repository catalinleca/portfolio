import type { ReactNode } from "react";
import { SectionLabel } from "../SectionLabel";
import styles from "./SectionShell.module.css";

interface SectionShellProps {
  id?: string;
  label?: string;
  children: ReactNode;
  className?: string;
  noBorder?: boolean;
}

export function SectionShell({
  id,
  label,
  children,
  className,
  noBorder,
}: SectionShellProps) {
  const sectionClass = [
    styles.section,
    noBorder ? styles.noBorder : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section id={id} className={sectionClass}>
      {label && <SectionLabel label={label} />}
      {children}
    </section>
  );
}
