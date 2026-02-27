import type { Metadata } from "next";
import { Footer } from "@/ui/layout";
import { PageTransition } from "@/ui/motion";
import { PrivacyArticle } from "./_components";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Privacy Policy | Catalin Leca",
  description: "Privacy and cookie policy for catalinleca.dev.",
};

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
