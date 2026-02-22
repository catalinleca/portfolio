import { trackClick } from "@/analytics";
import { CopyButton } from "@/ui/shared";
import styles from "./Contact.module.css";

export const CopyEmail = ({ email }: { email: string }) => {
  return (
    <CopyButton text={email} className={styles.emailBtn} {...trackClick("contact_copy_email", "contact")}>
      <span>{email}</span>
    </CopyButton>
  );
};
