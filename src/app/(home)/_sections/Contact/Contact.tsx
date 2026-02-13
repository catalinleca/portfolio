import { SectionShell, ArrowLink } from "@/ui/shared";
import { contactLinks } from "../content";
import styles from "./Contact.module.css";

export const Contact = () => {
  return (
    <SectionShell id="contact" className={styles.section}>
      <div className={styles.layout}>
        <div className={styles.left}>
          <h2 className={styles.heading}>
            Let&apos;s build
            <br />
            <em>something real.</em>
          </h2>
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
