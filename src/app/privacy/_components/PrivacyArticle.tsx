import styles from "../page.module.css";
import { PrivacyAnalyticsSection } from "./PrivacyAnalyticsSection";
import { PrivacyArticleHeader } from "./PrivacyArticleHeader";
import { PrivacyChoicesSection } from "./PrivacyChoicesSection";
import { PrivacyCookieCategoriesSection } from "./PrivacyCookieCategoriesSection";
import { PrivacyWhatWeCollectSection } from "./PrivacyWhatWeCollectSection";

interface PrivacyArticleProps {
  lastUpdated: string;
}

export const PrivacyArticle = ({ lastUpdated }: PrivacyArticleProps) => {
  return (
    <article className={styles.article}>
      <PrivacyArticleHeader lastUpdated={lastUpdated} />
      <PrivacyWhatWeCollectSection />
      <PrivacyAnalyticsSection />
      <PrivacyCookieCategoriesSection />
      <PrivacyChoicesSection />
    </article>
  );
};
