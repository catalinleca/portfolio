import { ANALYTICS_EVENTS } from "../constants";
import type { AnalyticsProperties, CaptureEvent } from "../types";

const sanitizeProperties = (
  properties: Record<string, string | number | boolean | undefined>
): AnalyticsProperties => {
  const cleanProperties: AnalyticsProperties = {};

  Object.entries(properties).forEach(([key, value]) => {
    if (typeof value !== "string" && typeof value !== "number" && typeof value !== "boolean") {
      return;
    }

    cleanProperties[key] = value;
  });

  return cleanProperties;
};

const getElementText = (element: HTMLElement): string | undefined => {
  const normalizedText = element.textContent?.trim().replace(/\s+/g, " ");

  if (normalizedText == null || normalizedText.length === 0) {
    return undefined;
  }

  return normalizedText.slice(0, 80);
};

export const registerClickTracking = (captureEvent: CaptureEvent): void => {
  document.addEventListener("click", (event) => {
    const clickedElement = event.target;
    if (!(clickedElement instanceof HTMLElement)) {
      return;
    }

    const trackableElement = clickedElement.closest<HTMLElement>("[data-analytics-click]");
    if (trackableElement == null) {
      return;
    }

    const href =
      trackableElement instanceof HTMLAnchorElement
        ? trackableElement.getAttribute("href") ?? undefined
        : undefined;

    const eventProperties = sanitizeProperties({
      link_name: trackableElement.dataset.analyticsLinkName,
      section_name: trackableElement.dataset.analyticsSection,
      click_text: getElementText(trackableElement),
      target_href: href,
      page_path: window.location.pathname,
    });

    captureEvent(ANALYTICS_EVENTS.click, eventProperties);
  });
};
