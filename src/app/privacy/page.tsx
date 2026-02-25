import { Footer } from "@/ui/layout";
import { PageTransition } from "@/ui/motion";
import { PrivacyArticle } from "./_components";
import styles from "./page.module.css";

const LAST_UPDATED = "February 24, 2026";

export default function PrivacyPage() {
  return (
    <PageTransition>
      <main className={styles.main}>
        <PrivacyArticle lastUpdated={LAST_UPDATED} />
      </main>
      <Footer />
    </PageTransition>
  );
}
