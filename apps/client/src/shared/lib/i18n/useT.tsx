import * as React from "react";
import vi from "./locales/vi.json";
import en from "./locales/en.json";

export type Locale = "vi" | "en";

type DeepRecord = { [key: string]: string | DeepRecord };

const locales: Record<Locale, DeepRecord> = { vi, en };

// ─── Context ──────────────────────────────────────────────────────────────────
interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const I18nContext = React.createContext<I18nContextValue>({
  locale: "vi",
  setLocale: () => {},
});

// ─── Provider ─────────────────────────────────────────────────────────────────
export interface I18nProviderProps {
  defaultLocale?: Locale;
  children: React.ReactNode;
}

export function I18nProvider({
  defaultLocale = "vi",
  children,
}: I18nProviderProps) {
  const [locale, setLocaleState] = React.useState<Locale>(() => {
    const stored = localStorage.getItem("pf_locale") as Locale | null;
    return stored === "vi" || stored === "en" ? stored : defaultLocale;
  });

  const setLocale = React.useCallback((next: Locale) => {
    localStorage.setItem("pf_locale", next);
    setLocaleState(next);
  }, []);

  const ctxValue = React.useMemo(
    () => ({ locale, setLocale }),
    [locale, setLocale],
  );

  return (
    <I18nContext.Provider value={ctxValue}>{children}</I18nContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useI18n() {
  return React.useContext(I18nContext);
}

/**
 * Resolve a dot-notation key (e.g. "nav.home") against the current locale dict.
 * Returns the key itself if not found, so missing keys are visible.
 */
function resolve(dict: DeepRecord, key: string): string {
  const parts = key.split(".");
  let cur: string | DeepRecord = dict;
  for (const part of parts) {
    if (typeof cur !== "object" || cur === null) return key;
    cur = cur[part];
  }
  return typeof cur === "string" ? cur : key;
}

/**
 * useT() — micro i18n hook.
 * @example
 *   const { t } = useT();
 *   return <span>{t("nav.home")}</span>;
 */
export function useT() {
  const { locale, setLocale } = useI18n();
  const dict = locales[locale];

  const t = React.useCallback((key: string) => resolve(dict, key), [dict]);

  return { t, locale, setLocale };
}
