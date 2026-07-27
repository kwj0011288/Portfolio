import React from "react";
import PropTypes from "prop-types";
import { LANGUAGES, useLanguage } from "../lib/language";

const LanguageToggle = ({ className = "" }) => {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      role="group"
      aria-label="Post language"
      className={`inline-flex rounded-full border border-zinc-200 bg-zinc-50 p-0.5 dark:border-zinc-700 dark:bg-zinc-800/50 ${className}`}
    >
      {LANGUAGES.map(({ code, label }) => {
        const isActive = language === code;
        return (
          <button
            key={code}
            type="button"
            lang={code}
            aria-pressed={isActive}
            onClick={() => setLanguage(code)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              isActive
                ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-700 dark:text-zinc-50"
                : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};

LanguageToggle.propTypes = {
  className: PropTypes.string,
};

export default LanguageToggle;
