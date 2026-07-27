import React, { useEffect, useMemo, useState } from "react";
import posts from "../data/blogPosts.json";
import BlogCard from "./BlogCard";
import {
  CATEGORIES,
  CATEGORY_STYLES,
  INACTIVE_PILL_CLASS,
  ALL_PILL_ACTIVE_CLASS,
} from "../lib/blogCategories";
import LanguageToggle from "./LanguageToggle";

const ALL = "All";

const Blog = () => {
  useEffect(() => {
    document.title = "Blog | Wonjae Kim";
  }, []);

  const [activeCategory, setActiveCategory] = useState(ALL);

  const sorted = useMemo(
    () => [...posts].sort((a, b) => new Date(b.date) - new Date(a.date)),
    []
  );

  const filtered =
    activeCategory === ALL
      ? sorted
      : sorted.filter((post) => post.category === activeCategory);

  return (
    <section className="section min-h-[70vh]" aria-labelledby="blog-title">
      <div className="container">
        <h1 id="blog-title" className="headline-2 mb-3">
          Blog
        </h1>
        <p className="text-zinc-400 mt-3 mb-6 max-w-[50ch]">
          Notes on building things: AI automation, mobile apps, and backend
          systems.
        </p>

        <div className="mb-10 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveCategory(ALL)}
            className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
              activeCategory === ALL ? ALL_PILL_ACTIVE_CLASS : INACTIVE_PILL_CLASS
            }`}
          >
            All
          </button>
          {CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                activeCategory === category
                  ? CATEGORY_STYLES[category].active
                  : INACTIVE_PILL_CLASS
              }`}
            >
              {category}
            </button>
          ))}
          <LanguageToggle className="ml-auto" />
        </div>

        {filtered.length === 0 ? (
          <p className="text-zinc-400">No posts yet.</p>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
