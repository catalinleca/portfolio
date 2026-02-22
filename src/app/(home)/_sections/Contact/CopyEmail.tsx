import { ANALYTICS_EVENTS } from "@/analytics";
import { CopyButton } from "@/ui/shared";
import styles from "./Contact.module.css";

export const CopyEmail = ({ email }: { email: string }) => {
  return (
    <CopyButton
      text={email}
      className={styles.emailBtn}
      data-analytics-click={ANALYTICS_EVENTS.click}
      data-analytics-link-name="contact_copy_email"
      data-analytics-location="contact"
      data-analytics-section="contact"
    >
      <span>{email}</span>
    </CopyButton>
  );
};
