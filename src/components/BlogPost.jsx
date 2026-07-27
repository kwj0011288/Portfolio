import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import posts from "../data/blogPosts.json";
import blogContent from "../data/blogContent";
import { formatDate } from "../lib/formatDate";
import LanguageToggle from "./LanguageToggle";
import PostLock from "./PostLock";
import { isLocked } from "../lib/lockedPosts";
import {
  localizeBody,
  localizeField,
  resolveBodyLanguage,
  useLanguage,
} from "../lib/language";

const PROSE_CLASSES =
  "blog-prose prose prose-zinc dark:prose-invert max-w-none break-words " +
  "prose-headings:font-semibold prose-headings:tracking-tight " +
  "prose-a:text-sky-500 dark:prose-a:text-sky-400 prose-a:no-underline hover:prose-a:underline " +
  "prose-code:before:content-none prose-code:after:content-none " +
  "prose-code:rounded prose-code:bg-zinc-100 prose-code:text-zinc-800 dark:prose-code:bg-zinc-800 dark:prose-code:text-zinc-100 prose-code:px-1 prose-code:py-0.5 prose-code:text-[0.85em] prose-code:font-normal " +
  "prose-pre:bg-zinc-900 prose-pre:text-zinc-100 dark:prose-pre:bg-zinc-950 prose-pre:ring-1 prose-pre:ring-zinc-800 prose-pre:rounded-xl " +
  "prose-table:text-sm prose-th:text-zinc-700 dark:prose-th:text-zinc-300";

const BlogPost = ({ slug }) => {
  const post = posts.find((p) => p.slug === slug);
  const { language } = useLanguage();

  const locked = isLocked(slug);
  const title = post ? localizeField(post, "title", language) : "";

  // Locked bodies arrive only after a successful decrypt; unlocked ones come
  // straight from the bundled markdown.
  const [decrypted, setDecrypted] = useState(null);
  const entry = locked ? decrypted : blogContent[slug];
  const body = localizeBody(entry, language);
  const bodyLanguage = resolveBodyLanguage(entry, language);

  // Leaving a post drops its plaintext, so coming back asks again.
  useEffect(() => {
    setDecrypted(null);
  }, [slug]);

  useEffect(() => {
    document.title = title ? `${title} | Wonjae Kim` : "Blog | Wonjae Kim";
  }, [title]);

  if (!post) {
    return (
      <section className="section min-h-[70vh]">
        <div className="container">
          <p className="text-zinc-400">Post not found.</p>
          <a href="#/blog" className="btn btn-secondary mt-6 inline-flex">
            Back to blog
          </a>
        </div>
      </section>
    );
  }

  return (
    <section className="section min-h-[70vh]">
      <div className="container max-w-[70ch]">
        <a
          href="#/blog"
          className="text-sm font-semibold text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          ← Back to blog
        </a>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <span className="block font-sans text-sm font-normal tracking-normal text-zinc-500 dark:text-zinc-400">
            {formatDate(post.date)}
          </span>
          <LanguageToggle />
        </div>
        <h1 className="headline-2 mt-2 mb-6" lang={language}>
          {title}
        </h1>

        {post.tags?.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-zinc-300/80 bg-white px-3 py-1 text-xs font-medium text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {locked && !decrypted ? (
          <PostLock slug={slug} onUnlock={setDecrypted} />
        ) : (
          <>
            {bodyLanguage !== language && (
              <p className="mb-8 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
                {language === "ko"
                  ? "이 글은 아직 한국어 번역이 없어 영어 원문을 표시합니다."
                  : "This post is not translated yet, so the Korean original is shown."}
              </p>
            )}

            <div className={PROSE_CLASSES} lang={bodyLanguage}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

BlogPost.propTypes = {
  slug: PropTypes.string.isRequired,
};

export default BlogPost;
