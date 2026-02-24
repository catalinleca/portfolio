export interface CookieConsent {
  analytics: boolean;
  essential: true;
  updatedAt: string;
  version: 1;
}

export const COOKIE_CONSENT_STORAGE_KEY = "portfolio_cookie_consent_v1";
type ConsentListener = () => void;
type SnapshotState = CookieConsent | null | undefined;

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
  if (!isClient()) {
    return null;
  }

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

const areConsentsEqual = (left: CookieConsent | null, right: CookieConsent | null): boolean => {
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

let consentSnapshot: SnapshotState;
const listeners = new Set<ConsentListener>();
let windowListenersAttached = false;

const notifyListeners = (): void => {
  listeners.forEach((listener) => listener());
};

const getSnapshotValue = (): CookieConsent | null => {
  if (consentSnapshot !== undefined) {
    return consentSnapshot;
  }

  consentSnapshot = readCookieConsentFromStorage();
  return consentSnapshot;
};

const updateCookieConsentSnapshot = (nextConsent: CookieConsent | null): void => {
  const currentConsent = getSnapshotValue();
  if (areConsentsEqual(currentConsent, nextConsent)) {
    return;
  }

  consentSnapshot = nextConsent;
  notifyListeners();
};

const refreshCookieConsentFromStorage = (): void => {
  updateCookieConsentSnapshot(readCookieConsentFromStorage());
};

const handleStorageEvent = (event: StorageEvent): void => {
  if (event.key !== COOKIE_CONSENT_STORAGE_KEY) {
    return;
  }

  refreshCookieConsentFromStorage();
};

const attachWindowListeners = (): void => {
  if (!isClient() || windowListenersAttached) {
    return;
  }

  window.addEventListener("storage", handleStorageEvent);
  windowListenersAttached = true;
};

const detachWindowListeners = (): void => {
  if (!isClient() || !windowListenersAttached || listeners.size > 0) {
    return;
  }

  window.removeEventListener("storage", handleStorageEvent);
  windowListenersAttached = false;
};

export const getCookieConsentSnapshot = (): CookieConsent | null => getSnapshotValue();

export const isAnalyticsConsentGranted = (): boolean =>
  getSnapshotValue()?.analytics === true;

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
    } catch {}
  }

  updateCookieConsentSnapshot(consent);
  return consent;
};

export const subscribeToCookieConsent = (onStoreChange: () => void): (() => void) => {
  if (!isClient()) {
    return () => {};
  }

  attachWindowListeners();
  listeners.add(onStoreChange);

  return () => {
    listeners.delete(onStoreChange);
    detachWindowListeners();
  };
};
