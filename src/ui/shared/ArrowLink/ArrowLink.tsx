import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./ArrowLink.module.css";

interface ArrowLinkProps {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
}

export const ArrowLink = ({
  href,
  children,
  external,
  className,
}: ArrowLinkProps) => {
  const combinedClassName = className
    ? `${styles.link} ${className}`
    : styles.link;

  if (external) {
    return (
      <a
        href={href}
        className={combinedClassName}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children} <span className={styles.arrow}>→</span>
      </a>
    );
  }

  return (
    <Link href={href} className={combinedClassName}>
      {children} <span className={styles.arrow}>→</span>
    </Link>
  );
};
