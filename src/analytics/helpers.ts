export const trackClick = (linkName: string, section?: string) => ({
  "data-analytics-click": "",
  "data-analytics-link-name": linkName,
  ...(section != null ? { "data-analytics-section": section } : {}),
});
