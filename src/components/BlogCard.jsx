import React from "react";
import PropTypes from "prop-types";
import { formatDate } from "../lib/formatDate";
import { CATEGORY_STYLES } from "../lib/blogCategories";
import { localizeField, useLanguage } from "../lib/language";
import { isLocked } from "../lib/lockedPosts";
import { Lock } from "lucide-react";

// Fallback thumbnails for posts without a real image, deterministic per
// slug so the same post always gets the same look.
const THUMBNAIL_GRADIENTS = [
  "from-sky-400/35 dark:from-sky-400/30",
  "from-emerald-400/30 dark:from-emerald-400/25",
  "from-amber-400/30 dark:from-amber-400/25",
  "from-fuchsia-400/30 dark:from-fuchsia-400/25",
  "from-violet-400/30 dark:from-violet-400/25",
  "from-rose-400/30 dark:from-rose-400/25",
  "from-lime-400/25 dark:from-lime-400/20",
  "from-cyan-400/30 dark:from-cyan-400/25",
];

const gradientFor = (slug) => {
  let hash = 0;
  for (const char of slug) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return THUMBNAIL_GRADIENTS[hash % THUMBNAIL_GRADIENTS.length];
};

const BlogCard = ({ post, className = "", language: languageOverride }) => {
  const { language: readingLanguage } = useLanguage();
  // The homepage pins English; only the blog pages follow the reader's toggle.
  const language = languageOverride || readingLanguage;
  const title = localizeField(post, "title", language);
  const excerpt = localizeField(post, "excerpt", language);
  const locked = isLocked(post.slug);

  return (
    <a
    href={`#/blog/${post.slug}`}
    className={`group flex flex-col overflow-hidden rounded-2xl border border-zinc-200/90 bg-zinc-100/50 shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 ${className}`}
  >
    <div className="relative aspect-video w-full overflow-hidden">
      {post.thumbnail ? (
        <img
          src={post.thumbnail}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div
          className={`relative h-full w-full bg-gradient-to-br via-zinc-100 to-white dark:via-zinc-800 dark:to-zinc-950 ${gradientFor(
            post.slug
          )}`}
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-thumbnail-dots" />
        </div>
      )}

      {locked && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/40 backdrop-blur-[2px] dark:bg-zinc-950/45">
          <span
            title="Password protected"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-300/80 bg-white/90 text-zinc-600 shadow-sm transition-transform duration-300 group-hover:scale-110 dark:border-zinc-700 dark:bg-zinc-900/90 dark:text-zinc-300"
          >
            <Lock size={20} strokeWidth={2} aria-hidden="true" />
            <span className="sr-only">Password protected</span>
          </span>
        </div>
      )}
    </div>

    <div className="flex flex-1 flex-col p-5">
      {post.category && (
        <span
          className={`mb-2 inline-flex w-fit items-center rounded-full px-2.5 py-1 text-[11px] font-medium ${
            CATEGORY_STYLES[post.category]?.badge ||
            "border border-zinc-200 bg-zinc-100 text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
          }`}
        >
          {post.category}
        </span>
      )}
      <h3 className="line-clamp-2 text-base font-semibold leading-snug tracking-tight text-zinc-900 dark:text-zinc-50">
        {title}
      </h3>
      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        {excerpt}
      </p>
      <div className="mt-auto flex items-center gap-2 pt-4 text-xs text-zinc-500 dark:text-zinc-500">
        {post.author && (
          <>
            <span>By {post.author}</span>
            <span
              className="h-3 w-px bg-zinc-300 dark:bg-zinc-700"
              aria-hidden="true"
            />
          </>
        )}
        <span>{formatDate(post.date)}</span>
      </div>
    </div>
    </a>
  );
};

BlogCard.propTypes = {
  post: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    excerpt: PropTypes.string,
    date: PropTypes.string.isRequired,
    author: PropTypes.string,
    category: PropTypes.string,
    thumbnail: PropTypes.string,
  }).isRequired,
  className: PropTypes.string,
  language: PropTypes.string,
};

export default BlogCard;
