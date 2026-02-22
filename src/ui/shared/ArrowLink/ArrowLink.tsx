import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import styles from "./ArrowLink.module.css";

interface ArrowLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children"> {
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
  ...rest
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
        {...rest}
      >
        {children} <span className={styles.arrow}>→</span>
      </a>
    );
  }

  return (
    <Link href={href} className={combinedClassName} {...rest}>
      {children} <span className={styles.arrow}>→</span>
    </Link>
  );
};
