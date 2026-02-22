import { ANALYTICS_EVENTS } from "@/analytics";
import { SectionShell, ArrowLink } from "@/ui/shared";
import { contactEmail, contactLinks } from "../content";
import { CopyEmail } from "./CopyEmail";
import styles from "./Contact.module.css";

export const Contact = () => {
  return (
    <SectionShell id="contact" className={styles.section}>
      <div className={styles.layout}>
        <div className={styles.left}>
          <h2 className={styles.heading}>
            Where to
            <br />
            <em>find me.</em>
          </h2>
        </div>
        <div className={styles.right}>
          <CopyEmail email={contactEmail} />
          {contactLinks.map((link) => (
            <ArrowLink
              key={link.label}
              href={link.href}
              external={link.external}
              className={styles.link}
              data-analytics-click={ANALYTICS_EVENTS.click}
              data-analytics-link-name={`contact_${link.label.toLowerCase().replace(/\s+/g, "_")}`}
              data-analytics-location="contact"
              data-analytics-section="contact"
            >
              {link.label}
            </ArrowLink>
          ))}
        </div>
      </div>
    </SectionShell>
  );
};
