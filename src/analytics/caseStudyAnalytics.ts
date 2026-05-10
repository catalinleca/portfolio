import { ANALYTICS_EVENTS } from "./constants";
import { capturePortfolioEvent } from "./initPortfolioAnalytics";

export const trackCaseStudySectionViewed = (sectionId: string): void => {
  capturePortfolioEvent(ANALYTICS_EVENTS.caseStudySectionViewed, {
    section_id: sectionId,
  });
};

export const trackCaseStudySectionNavClicked = (sectionId: string): void => {
  capturePortfolioEvent(ANALYTICS_EVENTS.caseStudySectionNavClicked, {
    section_id: sectionId,
  });
};

export const trackCaseStudyDecisionExpanded = (decisionId: string): void => {
  capturePortfolioEvent(ANALYTICS_EVENTS.caseStudyDecisionExpanded, {
    decision_id: decisionId,
  });
};
