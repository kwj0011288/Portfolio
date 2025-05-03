import React from "react";
import logo from "../assets/hero.png";
const sitemap = [
    {
        label: "Home",
        href: "#home",
    },
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
                <div className="lg:grid lg:grid-cols-2">
                    <div className="mb-10">
                        <h2 className="headline-1 mb-5 lg:max-w-[12ch] reveal-up">
                            Wonjae Kim
                        </h2>
                        <p className='text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400 font-medium text-lg tracking-wide mb-2'>
                            Software Engineer & Full-Stack Developer
                        </p>
                        <p className='text-zinc-400 text-lg mb-6 lg:mb-8 italic'>
                            Junior Computer Science Student at UMCP
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 lg:pl-20">
                        <div>
                            <p className="mb-2 reveal-up">Sitemap</p>
                            <ul>
                                {sitemap.map(({ label, href }, key) => (
                                    <li key={key}>
                                        <a
                                            href={href}
                                            className="block text-sm text-zinc-400 py-1 transition-colors hover:text-zinc-200 reveal-up"
                                        >
                                            {label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <p className="mb-2">Socials</p>
                            <ul>
                                {socials.map(({ label, href }, key) => (
                                    <li key={key}>
                                        <a
                                            href={href}
                                            target="_blank"
                                            className="block text-sm text-zinc-400 py-1 transition-colors hover:text-zinc-200 reveal-up"
                                        >
                                            {label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div></div>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-10 mb-8">
                    <a href="/" className="logo reveal-up">
                        <img
                            src={logo}
                            width={40}
                            height={40}
                            alt="Logo"
                            className="w-10"
                        />
                    </a>

                    <p className="text-zinc-500 text-sm reveal-up">
                        &copy; 2025 <span className="font-medium dark:text-zinc-200 text-zinc-900">Wonjae Kim</span>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
