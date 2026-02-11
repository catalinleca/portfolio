import { SectionShell, ArrowLink } from "@/ui/shared";
import { contactLinks } from "../content";
import styles from "./Contact.module.css";

export const Contact = () => {
  return (
    <SectionShell className={styles.section}>
      <div className={styles.layout}>
        <div className={styles.left}>
          <h2 className={styles.heading}>
            Let&apos;s build
            <br />
            <em>something real.</em>
          </h2>
          <p className={styles.subtext}>
            Open to senior React or React Native roles.
            <br />
            Based in Romania, working globally.
          </p>
        </div>
        <div className={styles.right}>
          {contactLinks.map((link) => (
            <ArrowLink
              key={link.label}
              href={link.href}
              external={link.external}
              className={styles.link}
            >
              {link.label}
            </ArrowLink>
          ))}
        </div>
      </div>
    </SectionShell>
  );
};
