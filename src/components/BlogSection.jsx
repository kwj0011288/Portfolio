import React from "react";
import posts from "../data/blogPosts.json";
import BlogCard from "./BlogCard";
import { DEFAULT_LANGUAGE } from "../lib/language";

const BlogSection = () => {
  const latest = [...posts]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  if (latest.length === 0) return null;

  return (
    <section id="blog" className="section" aria-labelledby="blog-section-title">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-4 reveal-up">
          <div>
            <h2 id="blog-section-title" className="headline-2 mb-3">
              Blog
            </h2>
            <p className="text-zinc-400 max-w-[50ch]">
              Notes on building things: AI automation, mobile apps, and
              backend systems.
            </p>
          </div>
          <a
            href="#/blog"
            className="text-sm font-semibold text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            View all posts →
          </a>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 reveal-up">
          {latest.map((post) => (
            <BlogCard
              key={post.slug}
              post={post}
              language={DEFAULT_LANGUAGE}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
