import type { MouseEventHandler } from "react";

export interface CookieBannerHeaderProps {
  isPreferencesOpen: boolean;
  hasDecision: boolean;
  shouldRenderStatusBadge: boolean;
  isAnalyticsEnabled: boolean;
  onClosePreferences: () => void;
}

export interface CookieBannerCollapsedActionsProps {
  onAcceptAll: () => void;
  onAcceptEssentials: () => void;
  onManagePreferences: () => void;
}

export interface CookieBannerPreferencesPanelProps {
  isAnalyticsEnabled: boolean;
  onToggleAnalytics: () => void;
  onCookieDetailsClick: MouseEventHandler<HTMLAnchorElement>;
  onSavePreferences: () => void;
  onAcceptAll: () => void;
  onAcceptEssentials: () => void;
}
