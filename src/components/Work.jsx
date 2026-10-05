import React from "react";
import WorkCard from "./Workcard";
import august from "../assets/works/august.png";
import hancom from "../assets/works/hancom.jpeg";
import git from "../assets/works/git.png";
import umd from "../assets/works/umd.svg";
import military from "../assets/works/military.jpeg";
import inzone from "../assets/works/inzone.png";
import dentalmon from "../assets/works/dentalmon.png";

export const workItem = [
  {
    imgSrc: dentalmon,
    label: "Dentalmon",
    position: "Founding Engineer",
    location: "College Park, MD",
    desc: [
      <>
        Deployed a <strong>dental insurance automation platform</strong> at a
        pilot dental clinic, processing{" "}
        <strong>812 claims across 471 EOBs</strong> over two months while
        reducing manual insurance posting time from{" "}
        <strong>15 to 3 minutes per claim</strong>.
      </>,
      <>
        Architected a <strong>distributed OCR/LLM pipeline</strong> with{" "}
        <strong>17 payer-specific processors</strong>, using serverless compute,{" "}
        <strong>Celery</strong>, and <strong>Redis</strong> to support
        idempotent callbacks and durable job recovery.
      </>,
      <>
        Secured multi-tenant patient data with{" "}
        <strong>PostgreSQL row-level security</strong>, per-user envelope
        encryption, and append-only access audits; enabled encrypted-field
        search using <strong>HMAC blind indexes</strong>.
      </>,
      <>
        Reduced median search-stage latency by <strong>86% (36 to 5 ms)</strong>{" "}
        using <strong>PostgreSQL GIN indexes</strong> for encrypted document
        lookup, measured on a{" "}
        <strong>2,000-document synthetic benchmark</strong>.
      </>,
    ],

    tech: ["Python", "OCR", "LLM", "Celery", "Redis", "PostgreSQL"],
    startDate: "June 2025",
    endDate: "Present",
  },
  {
    imgSrc: inzone,
    label: "InZone",
    position: "Software Engineer Intern",
    location: "College Park, MD",
    desc: [
      <>
        Built an AI pipeline integrating <strong>ChatGPT</strong>,{" "}
        <strong>Meshy AI</strong>, and <strong>ElevenLabs</strong> APIs to
        generate personalized{" "}
        <strong>3D avatars with synthesized voices</strong>, increasing average
        session time by <strong>2x</strong>.
      </>,
      <>
        Built a <strong>Ready Player Me</strong> avatar customization flow in a{" "}
        <strong>React WebView</strong>, supporting anonymous authentication,
        template selection, real-time asset equipping, and GLB rendering.
      </>,
      <>
        Implemented a <strong>Firebase-backed coin economy</strong> for voice
        interactions across <strong>iOS and Android</strong>, with balance
        validation, <strong>atomic Firestore deductions</strong>, conversation
        logging, and platform-specific in-app purchase tiers.
      </>,
    ],

    tech: [
      "React",
      "Firebase",
      "ChatGPT",
      "Meshy AI",
      "ElevenLabs",
      "Ready Player Me",
    ],
    startDate: "May 2025",
    endDate: "Aug 2025",
  },
  {
    imgSrc: umd,
    label: "NEMO",
    position: "Research Assistant",
    location: "College Park, MD",
    desc: [
      <>
        Optimized <strong>parallel C/C++ algorithms</strong> in stellar dynamics
        simulations to reduce runtime.
      </>,
      <>
        Ported core simulation modules to <strong>Windows and macOS</strong> by
        removing platform-specific dependencies.
      </>,
    ],

    tech: ["C++", "C", "Windows", "macOS"],
    startDate: "Feb 2025",
    endDate: "May 2025",
  },
  {
    imgSrc: hancom,
    label: "Hancom",
    position: "Software Engineer Intern",
    location: "South Korea",
    desc: [
      <>
        Built the <strong>Flutter codebase adopted by the team</strong> for{" "}
        <strong>Hancom Office Viewer</strong>&apos;s{" "}
        <strong>iOS and Android</strong> migration.
      </>,
      <>
        Implemented{" "}
        <strong>search, favorites, persistence, and responsive layouts</strong>,
        delivering assigned features <strong>15% ahead of schedule</strong>.
      </>,
    ],

    tech: ["Flutter", "Dart", "iOS", "Android"],
    startDate: "Jun 2024",
    endDate: "Aug 2024",
  },
  {
    imgSrc: umd,
    label: "University of Maryland (TA)",
    position: "Teaching Assistant",
    desc: [
      "Taught Korean language and culture to 20+ students using interactive methods",
      "Collaborated with faculty to design and revise curriculum aligned with standards",
    ],
    tech: ["Google Slides", "Zoom", "Curriculum Design", "Korean", "English"],
    startDate: "Aug 2023",
    endDate: "May 2024",
  },
  {
    imgSrc: august,
    label: "August - Automated Course Scheduling",
    position: "Co-Founder & Lead Software Engineer",
    desc: [
      <>
        Built and launched an <strong>automated course scheduling app</strong>{" "}
        used by <strong>220+ students</strong>, using <strong>Flutter</strong>{" "}
        and <strong>Django REST Framework</strong> to generate conflict-free
        schedules based on course availability and student preferences.
      </>,
      <>
        Implemented a <strong>backtracking algorithm</strong> to generate
        conflict-free timetable options in <strong>under 1 minute</strong>,
        accounting for seat availability and student preferences.
      </>,
      <>
        Built a <strong>multithreaded web scraper</strong> using{" "}
        <strong>Python</strong> and <strong>BeautifulSoup</strong> to
        synchronize UMD course offerings, seat availability, instructors, and
        meeting times with the Django backend.
      </>,
    ],

    tech: [
      "Flutter",
      "Dart",
      "Python",
      "Django REST Framework",
      "BeautifulSoup",
      "Web Scraping",
    ],
    startDate: "Jun 2023",
    endDate: "May 2025",
  },
  {
    imgSrc: military,
    label: "Front Observer & DMZ Police",
    position: "Military Service",
    desc: [
      "Served 5 months at the DMZ as a front observer with the 1st Artillery Division in a high-security border zone",
      "Promoted to Sergeant, led team operations, and received an honorable discharge for discipline and dedication",
    ],
    tech: ["Leadership", "Field Ops", "Security Protocol", "Korean"],
    startDate: "Jan 2021",
    endDate: "Jul 2022",
  },
  {
    imgSrc: git,
    label: "G.I.T",
    position: "Software Engineer Intern",
    desc: [
      <>
        Worked on <strong>advanced automotive diagnostics</strong> targeting
        next-gen <strong>safety</strong> and{" "}
        <strong>eco-friendly technologies</strong>.
      </>,
      <>
        Developed advanced <strong>electric vehicle diagnostics</strong>,
        aligning with trends in <strong>autonomy</strong> and{" "}
        <strong>connectivity</strong>.
      </>,
      <>
        Improved <strong>vehicle performance</strong>, <strong>quality</strong>,
        and <strong>inspection technologies</strong> by implementing strategic
        enhancements.
      </>,
    ],

    tech: ["Kotlin", "Android", "Git"],
    startDate: "Jun 2019",
    endDate: "Aug 2019",
  },
];

const Work = () => {
  return (
    <section id="work" className="section pb-10" aria-labelledby="work-title">
      <div className="container px-3 md:px-4">
        <h2 id="work-title" className="headline-2 reveal-up">
          Work Experience
        </h2>

        <p className="text-zinc-500 dark:text-zinc-400 mt-3 mb-6 md:mb-8 max-w-[50ch] reveal-up">
          My Journey as a Developer, Researcher, and Innovator
        </p>

        {/* 워크 카드 컨테이너 */}
        <div className="relative work-reveal pt-2">
          <div className="relative space-y-8 md:space-y-8">
            {workItem.map((experience, key) => (
              <div key={key} className="reveal-up mb-8 md:mb-0">
                <WorkCard experience={experience} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Work;
