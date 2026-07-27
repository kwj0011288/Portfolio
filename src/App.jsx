/*Components*/
import Header from "./components/Header";
import Hero from "./components/Hero";
// import About from "./components/About";
import Skill from "./components/Skill";
import Projects from "./components/Projects";
import Work from "./components/Work";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import PersonalStatement from "./components/PersonalStatement";
import Blog from "./components/Blog";
import BlogPost from "./components/BlogPost";
import BlogSection from "./components/BlogSection";
import { projects } from "./components/Projects";
import { workItem } from "./components/Work";

import {
  LanguageContext,
  readStoredLanguage,
  storeLanguage,
} from "./lib/language";

import { ReactLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { createContext, useState, useEffect, useLayoutEffect } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Create Theme Context
export const ThemeContext = createContext();

const App = () => {
  const siteUrl = "https://kimwonjae.com";
  const [theme, setTheme] = useState(() => {
    // Check for stored preference or use system preference
    const savedTheme = localStorage.getItem("theme");
    return savedTheme || "light";
  });

  useEffect(() => {
    // Save theme preference
    localStorage.setItem("theme", theme);

    // Apply theme class to document
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    document.title = "Wonjae Kim";

    const ensureMeta = (selector, attributes) => {
      let element = document.head.querySelector(selector);
      if (!element) {
        element = document.createElement("meta");
        document.head.appendChild(element);
      }

      Object.entries(attributes).forEach(([key, value]) => {
        element.setAttribute(key, value);
      });
    };

    const ensureLink = (selector, attributes) => {
      let element = document.head.querySelector(selector);
      if (!element) {
        element = document.createElement("link");
        document.head.appendChild(element);
      }

      Object.entries(attributes).forEach(([key, value]) => {
        element.setAttribute(key, value);
      });
    };

    ensureMeta('meta[name="description"]', {
      name: "description",
      content:
        "Wonjae Kim is a software engineer building AI automation, mobile apps, SaaS products, and production backend systems.",
    });
    ensureMeta('meta[name="robots"]', {
      name: "robots",
      content: "index, follow, max-image-preview:large",
    });
    ensureMeta('meta[property="og:title"]', {
      property: "og:title",
      content: "Wonjae Kim",
    });
    ensureMeta('meta[property="og:description"]', {
      property: "og:description",
      content:
        "Software engineer focused on AI automation, mobile apps, SaaS, and production backends.",
    });
    ensureMeta('meta[property="og:url"]', {
      property: "og:url",
      content: `${siteUrl}/`,
    });
    ensureMeta('meta[name="twitter:title"]', {
      name: "twitter:title",
      content: "Wonjae Kim",
    });
    ensureMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
      content:
        "Explore Wonjae Kim's software engineering work across AI automation, mobile apps, SaaS, and backend systems.",
    });
    ensureLink('link[rel="canonical"]', {
      rel: "canonical",
      href: `${siteUrl}/`,
    });

    const structuredData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Person",
          "@id": `${siteUrl}/#person`,
          name: "Wonjae Kim",
          url: `${siteUrl}/`,
          jobTitle: "Software Engineer",
          description:
            "Software engineer focused on AI automation, mobile apps, SaaS products, and production backend systems.",
          email: "mailto:kwj0011288@gmail.com",
          sameAs: [
            "https://github.com/kwj0011288",
            "https://www.linkedin.com/in/kwj0011288/",
            "https://www.instagram.com/one_jae_kim",
          ],
          knowsAbout: [
            "React",
            "Flutter",
            "Python",
            "Django",
            "FastAPI",
            "OCR",
            "Computer Vision",
            "SaaS",
            "Mobile App Development",
            "Full-Stack Development",
          ],
          alumniOf: {
            "@type": "CollegeOrUniversity",
            name: "University of Maryland",
          },
        },
        {
          "@type": "WebSite",
          "@id": `${siteUrl}/#website`,
          url: `${siteUrl}/`,
          name: "Wonjae Kim",
          description:
            "Personal website for Wonjae Kim.",
          inLanguage: "en",
          publisher: {
            "@id": `${siteUrl}/#person`,
          },
        },
        {
          "@type": "ProfilePage",
          "@id": `${siteUrl}/#profile-page`,
          url: `${siteUrl}/`,
          name: "Wonjae Kim",
          isPartOf: {
            "@id": `${siteUrl}/#website`,
          },
          about: {
            "@id": `${siteUrl}/#person`,
          },
          mainEntity: {
            "@id": `${siteUrl}/#person`,
          },
        },
        {
          "@type": "ItemList",
          "@id": `${siteUrl}/#projects`,
          name: "Software Engineering Projects",
          itemListElement: projects.map((project, index) => ({
            "@type": "CreativeWork",
            position: index + 1,
            name: project.title,
            description: project.description,
            url: project.projectLink || project.githubLink || `${siteUrl}/`,
            keywords: project.tags.join(", "),
          })),
        },
        {
          "@type": "ItemList",
          "@id": `${siteUrl}/#experience`,
          name: "Work Experience",
          itemListElement: workItem.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "OrganizationRole",
              roleName: item.position,
              startDate: item.startDate,
              endDate: item.endDate === "Present" ? undefined : item.endDate,
              worksFor: {
                "@type": "Organization",
                name: item.label,
              },
              skills: item.tech.join(", "),
            },
          })),
        },
      ],
    };

    let script = document.getElementById("structured-data");
    if (!script) {
      script = document.createElement("script");
      script.id = "structured-data";
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(structuredData);
  }, [siteUrl]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  // Blog reading language. English is the default; the choice is remembered
  // so it carries across posts.
  const [language, setLanguage] = useState(readStoredLanguage);

  useEffect(() => {
    storeLanguage(language);
  }, [language]);

  const [route, setRoute] = useState(() =>
    typeof window !== "undefined" ? window.location.hash : ""
  );

  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const blogMatch = route.match(/^#\/blog(?:\/(.+))?$/);

  useLayoutEffect(() => {
    if (!route.startsWith("#/blog")) return;

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [route]);

  useGSAP(() => {
    // 일반 reveal-up 애니메이션
    const elements = gsap.utils.toArray(".reveal-up:not(.work-reveal)");
    elements.forEach((element) => {
      gsap.to(element, {
        scrollTrigger: {
          trigger: element,
          scrub: true,
          start: "-200 bottom",
          end: "bottom 80%",
          toggleActions: "play none none reverse",
        },
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.inOut",
      });
    });

    // Work 섹션용 빠른 애니메이션
    const workElements = gsap.utils.toArray(".work-reveal");
    workElements.forEach((element) => {
      gsap.to(element, {
        scrollTrigger: {
          trigger: element,
          scrub: false,
          start: "-150 bottom",
          end: "bottom 80%",
          toggleActions: "play none none reverse",
        },
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
      });
    });

    // Project cards: no scrub (avoids long fade / “blurry” first tile)
    gsap.utils.toArray(".project-reveal").forEach((element) => {
      gsap.to(element, {
        scrollTrigger: {
          trigger: element,
          start: "top bottom-=60",
          toggleActions: "play none none reverse",
        },
        opacity: 1,
        y: 0,
        duration: 0.45,
        ease: "power2.out",
      });
    });
  }, [route]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <LanguageContext.Provider value={{ language, setLanguage }}>
      <ReactLenis root>
        <Header />
        <main>
          {blogMatch ? (
            blogMatch[1] ? (
              <BlogPost slug={blogMatch[1]} />
            ) : (
              <Blog />
            )
          ) : (
            <>
              <Hero />
              {/* <About /> */}
              {/* <PersonalStatement /> */}
              <Skill />
              <Work />
              <Projects />
              <BlogSection />
              <Contact />
            </>
          )}
        </main>
        <Footer />
      </ReactLenis>
      </LanguageContext.Provider>
    </ThemeContext.Provider>
  );
};

export default App;
