/*Components*/
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Skill from "./components/Skill";
import Projects from "./components/Projects";
import Work from "./components/Work";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import PersonalStatement from "./components/PersonalStatement";

import { ReactLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { createContext, useState, useEffect } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Create Theme Context
export const ThemeContext = createContext();

const App = () => {
  const [theme, setTheme] = useState(() => {
    // Check for stored preference or use system preference
    const savedTheme = localStorage.getItem("theme");
    return savedTheme || "dark";
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

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

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
  });

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ReactLenis root>
        <Header />
        <main>
          <Hero />
          {/* <div className="text-center mt-8">
            <p className="text-lg text-gray-500 dark:text-gray-400">
              Please check wkim-dev.tech website before{" "}
              <a
                href="https://wkim-dev.tech"
                className="text-blue-500 underline"
              >
                wkim-dev.tech
              </a>
            </p>
          </div> */}
          <About />

          <PersonalStatement />
          <Skill />
          <Work />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </ReactLenis>
    </ThemeContext.Provider>
  );
};

export default App;
