import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import PropTypes from "prop-types";
import { useClickOutside } from "./hooks/useClickOutside";

const NAV_ITEMS = [
  { label: "About", link: "#about" },
  { label: "Skills", link: "#skills" },
  { label: "Experience", link: "#work" },
  { label: "Projects", link: "#projects" },
  { label: "Contact", link: "#contact" },
];

const MD_MAX = "(max-width: 767px)";

const Navbar = ({ navOpen, setNavOpen, menuButtonRef }) => {
  const [activeSection, setActiveSection] = useState("about");
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(MD_MAX).matches : false
  );
  const [menuCoords, setMenuCoords] = useState({ top: 0, right: 0 });
  const navRef = useRef(null);

  useEffect(() => {
    const mm = window.matchMedia(MD_MAX);
    const sync = () => setIsMobile(mm.matches);
    mm.addEventListener("change", sync);
    return () => mm.removeEventListener("change", sync);
  }, []);

  const updateMenuAnchor = useCallback(() => {
    if (!isMobile || !menuButtonRef?.current) return;
    const r = menuButtonRef.current.getBoundingClientRect();
    setMenuCoords({ top: r.bottom + 6, right: window.innerWidth - r.right });
  }, [isMobile, menuButtonRef]);

  useLayoutEffect(() => {
    updateMenuAnchor();
  }, [updateMenuAnchor, navOpen]);

  useEffect(() => {
    if (!isMobile) return;
    window.addEventListener("resize", updateMenuAnchor);
    return () => window.removeEventListener("resize", updateMenuAnchor);
  }, [isMobile, updateMenuAnchor]);

  useClickOutside({
    ref: [navRef, menuButtonRef],
    eventType: "pointerdown",
    callback: () => {
      if (isMobile && navOpen) {
        setNavOpen?.(false);
      }
    },
  });

  const handleClick = (event, link) => {
    event.preventDefault();

    document.querySelectorAll(".nav-link").forEach((l) => {
      l.classList.remove("active");
    });

    event.currentTarget.classList.add("active");

    const target = document.querySelector(link);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      setActiveSection(link.substring(1));
    }

    if (typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches) {
      setNavOpen?.(false);
    }
  };

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => item.link.substring(1));

    const handleScroll = () => {
      let foundActive = false;

      const isAtBottom =
        window.innerHeight + window.pageYOffset >=
        document.body.offsetHeight - 100;

      if (isAtBottom) {
        if (activeSection !== "contact") {
          setActiveSection("contact");
          document.querySelectorAll(".nav-link").forEach((l) =>
            l.classList.remove("active")
          );
          document
            .querySelector('.nav-link[href="#contact"]')
            ?.classList.add("active");
        }
        return;
      }

      if (activeSection === "contact") {
        const projectsElement = document.getElementById("projects");
        if (projectsElement) {
          const rect = projectsElement.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection("projects");
            document.querySelectorAll(".nav-link").forEach((l) =>
              l.classList.remove("active")
            );
            document
              .querySelector('.nav-link[href="#projects"]')
              ?.classList.add("active");
            return;
          }
        }
      }

      for (const section of sections) {
        const element = document.getElementById(section);
        if (!element) continue;

        const rect = element.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
          if (activeSection !== section) {
            setActiveSection(section);
            document.querySelectorAll(".nav-link").forEach((l) =>
              l.classList.remove("active")
            );
            document
              .querySelector(`.nav-link[href="#${section}"]`)
              ?.classList.add("active");
          }
          foundActive = true;
          break;
        }
      }

      if (!foundActive && window.pageYOffset > 100) {
        let closestSection = null;
        let closestDistance = Infinity;

        for (const section of sections) {
          const element = document.getElementById(section);
          if (!element) continue;

          const rect = element.getBoundingClientRect();
          const distance = Math.abs(rect.top);

          if (distance < closestDistance) {
            closestDistance = distance;
            closestSection = section;
          }
        }

        if (closestSection && activeSection !== closestSection) {
          setActiveSection(closestSection);
          document.querySelectorAll(".nav-link").forEach((l) =>
            l.classList.remove("active")
          );
          document
            .querySelector(`.nav-link[href="#${closestSection}"]`)
            ?.classList.add("active");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [activeSection]);

  const mobileStyle =
    isMobile
      ? {
          position: "fixed",
          top: menuCoords.top,
          right: menuCoords.right,
          left: "auto",
          marginTop: 0,
        }
      : undefined;

  return (
    <nav
      ref={navRef}
      id="site-nav"
      className={`navbar ${navOpen ? "active" : ""}`}
      style={mobileStyle}
      aria-label="Primary"
      aria-hidden={isMobile && !navOpen}
    >
      {NAV_ITEMS.map(({ label, link, className = "" }) => (
        <a
          key={label}
          href={link}
          className={`nav-link ${
            link === "#" + activeSection ? "active" : ""
          } ${className}`}
          onClick={(e) => handleClick(e, link)}
        >
          {label}
        </a>
      ))}
    </nav>
  );
};

Navbar.propTypes = {
  navOpen: PropTypes.bool.isRequired,
  setNavOpen: PropTypes.func,
  menuButtonRef: PropTypes.shape({ current: PropTypes.any }),
};

export default Navbar;
