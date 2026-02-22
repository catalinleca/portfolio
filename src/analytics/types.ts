export interface AnalyticsProperties {
  [key: string]: string | number | boolean;
}

export type CaptureEvent = (
  eventName: string,
  properties?: AnalyticsProperties
) => void;
