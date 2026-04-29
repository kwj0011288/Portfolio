import React from "react";
import logo from "../assets/hero.png";
const sitemap = [
  {
    label: "About",
    href: "#about",
  },
  {
    label: "Skills",
    href: "#skills",
  },
  {
    label: "Experience",
    href: "#work",
  },
  {
    label: "Projects",
    href: "#projects",
  },
  {
    label: "Contact me",
    href: "#contact",
  },
];

const socials = [
  {
    label: "Email",
    href: "mailto:kwj0011288@gmail.com",
  },
  {
    label: "GitHub",
    href: "https://github.com/kwj0011288",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/kwj0011288/",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/one_jae_kim",
  },
];

const Footer = () => {
  return (
    <footer className="section">
      <div className="container">
        <div className="lg:grid lg:grid-cols-2 lg:items-start">
          <div className="mb-10 lg:mb-0">
            <p className="text-sm text-zinc-400 mb-1 reveal-up tracking-wide">
              Software Engineer
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 mb-3 reveal-up">
              Wonjae Kim
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-[30ch] reveal-up">
              Building end-to-end systems across mobile, web, and SaaS, from
              backend to frontend.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 lg:pl-20">
            <div>
              <p className="text-xs uppercase tracking-widest text-zinc-400 mb-4 reveal-up">
                Sitemap
              </p>
              <ul className="space-y-2">
                {sitemap.map(({ label, href }, key) => (
                  <li key={key}>
                    <a
                      href={href}
                      className="text-sm text-zinc-500 dark:text-zinc-400 transition-colors hover:text-zinc-900 dark:hover:text-zinc-100 reveal-up"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-zinc-400 mb-4 reveal-up">
                Socials
              </p>
              <ul className="space-y-2">
                {socials.map(({ label, href }, key) => (
                  <li key={key}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-zinc-500 dark:text-zinc-400 transition-colors hover:text-zinc-900 dark:hover:text-zinc-100 reveal-up"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-10 mb-8 pb-10">
          <a href="/" className="logo reveal-up">
            <img
              src={logo}
              width={40}
              height={40}
              alt="Logo"
              className="w-10"
            />
          </a>

          <p className="text-sm reveal-up text-zinc-500">
            © Copyright 2026. Wonjae Kim. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
