import { createContext, useContext } from "react";

export const DEFAULT_LANGUAGE = "en";
export const LANGUAGES = [
  { code: "en", label: "EN" },
  { code: "ko", label: "KO" },
];

const STORAGE_KEY = "blogLanguage";
const isSupported = (code) => LANGUAGES.some((lang) => lang.code === code);

export const readStoredLanguage = () => {
  if (typeof window === "undefined") return DEFAULT_LANGUAGE;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return isSupported(stored) ? stored : DEFAULT_LANGUAGE;
};

export const storeLanguage = (code) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, code);
};

export const LanguageContext = createContext({
  language: DEFAULT_LANGUAGE,
  setLanguage: () => {},
});

export const useLanguage = () => useContext(LanguageContext);

// Metadata keys are suffixed per language: `title` is English (the default),
// `title_ko` is Korean. A missing translation falls back to the default so a
// half-translated post still renders.
export const localizeField = (post, field, language) => {
  if (language === DEFAULT_LANGUAGE) return post[field];
  return post[`${field}_${language}`] || post[field];
};

// Bodies are keyed by language: { en: "...", ko: "..." }.
// Requested language wins, then the default, then whatever exists.
export const resolveBodyLanguage = (entry, language) => {
  if (!entry) return language;
  if (entry[language]) return language;
  if (entry[DEFAULT_LANGUAGE]) return DEFAULT_LANGUAGE;
  return Object.keys(entry)[0] || language;
};

export const localizeBody = (entry, language) =>
  entry ? entry[resolveBodyLanguage(entry, language)] || "" : "";
