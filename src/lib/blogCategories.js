export const CATEGORIES = [
  "Security & Compliance",
  "Infrastructure",
  "AI & Data",
  "Performance",
];

// Flat Tailwind palette tints. Rhythm per category:
//   badge  → 50 / 200 / 700   (dark: 950 / 800 / 300)
//   active → 100 / 300 / 800  (dark: 900 / 700 / 200)
// Class strings stay literal so Tailwind's scanner keeps them.
export const CATEGORY_STYLES = {
  "Security & Compliance": {
    badge:
      "border border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300",
    active:
      "border border-red-300 bg-red-100 text-red-800 dark:border-red-700 dark:bg-red-900 dark:text-red-200",
  },
  Infrastructure: {
    badge:
      "border border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300",
    active:
      "border border-blue-300 bg-blue-100 text-blue-800 dark:border-blue-700 dark:bg-blue-900 dark:text-blue-200",
  },
  "AI & Data": {
    badge:
      "border border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-indigo-800 dark:bg-indigo-950 dark:text-indigo-300",
    active:
      "border border-indigo-300 bg-indigo-100 text-indigo-800 dark:border-indigo-700 dark:bg-indigo-900 dark:text-indigo-200",
  },
  Performance: {
    badge:
      "border border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300",
    active:
      "border border-green-300 bg-green-100 text-green-800 dark:border-green-700 dark:bg-green-900 dark:text-green-200",
  },
};

// Shared neutral look for any unselected filter pill, regardless of category.
export const INACTIVE_PILL_CLASS =
  "border border-zinc-200 bg-zinc-50 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200";

// "All" filter pill: a soft neutral pastel, not a full-contrast invert, so
// it stays visually consistent with the category pastel pills.
export const ALL_PILL_ACTIVE_CLASS =
  "border border-zinc-300 bg-zinc-200 text-zinc-800 dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-50";
