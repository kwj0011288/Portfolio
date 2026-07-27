// Blog bodies live at `content/blog/<slug>.<lang>.md`.
// Shape: { [slug]: { en: "...", ko: "..." } }
const modules = import.meta.glob("../content/blog/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

const contentBySlug = {};

for (const [path, raw] of Object.entries(modules)) {
  const file = path.split("/").pop().replace(/\.md$/, "");
  const match = file.match(/^(.+)\.(en|ko)$/);
  if (!match) continue;

  const [, slug, lang] = match;
  contentBySlug[slug] = { ...contentBySlug[slug], [lang]: raw };
}

export default contentBySlug;
