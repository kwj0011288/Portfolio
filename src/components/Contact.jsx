import React from "react";

const Contact = () => {
  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <div className="container">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          <p className="text-zinc-400 text-sm min-w-[120px] reveal-up">
            Contact
          </p>
          <div>
            <h2
              id="contact-title"
              className="text-xl font-normal mb-6 reveal-up tracking-tight"
            >
              Contact Wonjae Kim for software engineering roles, product
              collaboration, or AI-focused project work.
            </h2>
            <p className="text-zinc-400 text-xl mb-6 reveal-up">
              kwj0011288@gmail.com
            </p>
            <div className="flex gap-3 flex-wrap">
              <a
                href="mailto:kwj0011288@gmail.com"
                className="px-5 py-2 rounded-full border border-zinc-300 dark:border-zinc-700 text-sm hover:border-zinc-500 dark:hover:border-zinc-400 transition-colors reveal-up"
              >
                Email
              </a>
              <a
                href="https://www.linkedin.com/in/kwj0011288/"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2 rounded-full border border-zinc-300 dark:border-zinc-700 text-sm hover:border-zinc-500 dark:hover:border-zinc-400 transition-colors reveal-up"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/kwj0011288"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2 rounded-full border border-zinc-300 dark:border-zinc-700 text-sm hover:border-zinc-500 dark:hover:border-zinc-400 transition-colors reveal-up"
              >
                GitHub
              </a>
              <a
                href="https://www.instagram.com/one_jae_kim"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2 rounded-full border border-zinc-300 dark:border-zinc-700 text-sm hover:border-zinc-500 dark:hover:border-zinc-400 transition-colors reveal-up"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
