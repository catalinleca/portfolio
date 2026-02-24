export interface CookieConsent {
  analytics: boolean;
  essential: true;
  updatedAt: string;
  version: 1;
}

export const COOKIE_CONSENT_STORAGE_KEY = "portfolio_cookie_consent_v1";
export const COOKIE_CONSENT_UPDATED_EVENT = "portfolio-cookie-consent-updated";

const isClient = (): boolean => typeof window !== "undefined";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value != null;

const isCookieConsent = (value: unknown): value is CookieConsent => {
  if (!isRecord(value)) {
    return false;
  }

  return (
    value.version === 1 &&
    value.essential === true &&
    typeof value.analytics === "boolean" &&
    typeof value.updatedAt === "string"
  );
};

const readCookieConsentFromStorage = (): CookieConsent | null => {
  try {
    const rawValue = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
    if (rawValue == null) {
      return null;
    }

    const parsedValue: unknown = JSON.parse(rawValue);
    if (!isCookieConsent(parsedValue)) {
      return null;
    }

    return parsedValue;
  } catch {
    return null;
  }
};

const areConsentsEqual = (
  left: CookieConsent | null,
  right: CookieConsent | null
): boolean => {
  if (left === right) {
    return true;
  }

  if (left == null || right == null) {
    return false;
  }

  return (
    left.analytics === right.analytics &&
    left.essential === right.essential &&
    left.version === right.version &&
    left.updatedAt === right.updatedAt
  );
};

let cachedCookieConsent: CookieConsent | null = null;
let hasCachedSnapshot = false;
const subscribers = new Set<() => void>();
let isStoreSubscribedToWindow = false;

const getCurrentCookieConsent = (): CookieConsent | null => {
  if (!isClient()) {
    return null;
  }

  if (!hasCachedSnapshot) {
    cachedCookieConsent = readCookieConsentFromStorage();
    hasCachedSnapshot = true;
  }

  return cachedCookieConsent;
};

const notifySubscribers = (): void => {
  subscribers.forEach((subscriber) => subscriber());
};

const updateCookieConsentSnapshot = (nextConsent: CookieConsent | null): void => {
  if (areConsentsEqual(cachedCookieConsent, nextConsent)) {
    return;
  }

  cachedCookieConsent = nextConsent;
  hasCachedSnapshot = true;
  notifySubscribers();
};

const dispatchConsentUpdated = (consent: CookieConsent): void => {
  if (!isClient()) {
    return;
  }

  window.dispatchEvent(
    new CustomEvent<CookieConsent>(COOKIE_CONSENT_UPDATED_EVENT, {
      detail: consent,
    })
  );
};

const refreshCookieConsentFromStorage = (): void => {
  if (!isClient()) {
    return;
  }

  updateCookieConsentSnapshot(readCookieConsentFromStorage());
};

const handleConsentUpdatedEvent = (event: Event): void => {
  if (event instanceof CustomEvent && isCookieConsent(event.detail)) {
    updateCookieConsentSnapshot(event.detail);
    return;
  }

  refreshCookieConsentFromStorage();
};

const handleStorageEvent = (event: StorageEvent): void => {
  if (event.key !== COOKIE_CONSENT_STORAGE_KEY) {
    return;
  }

  refreshCookieConsentFromStorage();
};

const ensureStoreWindowSubscription = (): void => {
  if (!isClient() || isStoreSubscribedToWindow) {
    return;
  }

  window.addEventListener(COOKIE_CONSENT_UPDATED_EVENT, handleConsentUpdatedEvent);
  window.addEventListener("storage", handleStorageEvent);
  isStoreSubscribedToWindow = true;
};

const removeStoreWindowSubscription = (): void => {
  if (!isClient() || !isStoreSubscribedToWindow || subscribers.size > 0) {
    return;
  }

  window.removeEventListener(COOKIE_CONSENT_UPDATED_EVENT, handleConsentUpdatedEvent);
  window.removeEventListener("storage", handleStorageEvent);
  isStoreSubscribedToWindow = false;
};

export const getCookieConsentSnapshot = (): CookieConsent | null => getCurrentCookieConsent();

export const isAnalyticsConsentGranted = (): boolean =>
  getCurrentCookieConsent()?.analytics === true;

export const saveCookieConsent = (analyticsEnabled: boolean): CookieConsent => {
  const consent: CookieConsent = {
    analytics: analyticsEnabled,
    essential: true,
    updatedAt: new Date().toISOString(),
    version: 1,
  };

  if (isClient()) {
    try {
      window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, JSON.stringify(consent));
    } catch {
      console.debug("cookie consent save failed");
    }

    updateCookieConsentSnapshot(consent);
    dispatchConsentUpdated(consent);
  }

  return consent;
};

export const subscribeToCookieConsent = (onStoreChange: () => void): (() => void) => {
  if (!isClient()) {
    return () => {};
  }

  ensureStoreWindowSubscription();
  subscribers.add(onStoreChange);

  return () => {
    subscribers.delete(onStoreChange);
    removeStoreWindowSubscription();
  };
};
