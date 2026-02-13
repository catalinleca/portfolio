import { CopyButton } from "@/ui/shared";
import styles from "./Contact.module.css";

export const CopyEmail = ({ email }: { email: string }) => {
  return (
    <CopyButton text={email} className={styles.emailBtn}>
      <span>{email}</span>
    </CopyButton>
  );
};
