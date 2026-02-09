import Link from "next/link";
import styles from "./CaseStudyCard.module.css";

interface CaseStudyCardProps {
  label: string;
  title: string;
  description: string;
  bullets: string[];
  href: string;
  externalHref?: string;
  externalLabel?: string;
}

export function CaseStudyCard({
  label,
  title,
  description,
  bullets,
  href,
  externalHref,
  externalLabel,
}: CaseStudyCardProps) {
  return (
    <div className={styles.card}>
      <p className={styles.label}>{label}</p>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      <ul className={styles.bullets}>
        {bullets.map((bullet) => (
          <li key={bullet} className={styles.bullet}>
            {bullet}
          </li>
        ))}
      </ul>
      <div className={styles.actions}>
        <Link href={href} className={styles.primaryAction}>
          Read case study &rarr;
        </Link>
        {externalHref && (
          <a
            href={externalHref}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondaryAction}
          >
            {externalLabel ?? "Visit product"}
          </a>
        )}
      </div>
    </div>
  );
}

export function ComingSoonCard({ title }: { title: string }) {
  return (
    <div className={styles.comingSoon}>
      <div>
        <p className={styles.label}>Case Study</p>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.comingSoonText}>Coming soon</p>
      </div>
    </div>
  );
}
