import React from "react";
import WorkCard from "./Workcard";
import august from "../assets/works/august.png";
import hancom from "../assets/works/hancom.jpeg";
import git from "../assets/works/git.png";
import umd from "../assets/works/umd.svg";
import military from "../assets/works/military.jpeg";
import inzone from "../assets/works/inzone.png";
import noIcon from "../assets/works/no_icon.png";

export const workItem = [
  {
    imgSrc: noIcon,
    label: "Dentalmon",
    position: "Software Engineer",
    desc: [
      <>
        Using <strong>Python</strong> and{" "}
        <strong>regular expressions (Regex)</strong>, developed an
        <strong> OCR data extraction pipeline</strong> to parse unstructured PDF
        <strong> EOBs (Explanation of Benefits)</strong> from over 10 major
        insurers including
        <strong> Guardian</strong>, <strong>MetLife</strong>, and{" "}
        <strong>Delta Dental</strong>. Fully automated the extraction of key
        fields such as <strong>patient information</strong>,
        <strong> ADA codes</strong>, <strong>service dates</strong>, and{" "}
        <strong>insurer payments</strong> that were previously processed
        manually.
      </>,
      <>
        Designed a <strong>dual OCR architecture</strong> and implemented an
        <strong> asynchronous workflow</strong> with <strong>Celery</strong> to
        achieve more than
        <strong> 95 percent extraction accuracy</strong> for both scanned and
        text-based PDFs. Reduced processing time for large multi-hundred page
        documents by an average of
        <strong> 70 percent</strong> while ensuring <strong>scalability</strong>
        .
      </>,
      <>
        Built <strong>RESTful API</strong> endpoints with{" "}
        <strong>Django REST Framework</strong> to provide the refined OCR data
        to an <strong>Electron</strong>-based desktop application, enabling
        dental practices to access{" "}
        <strong>daily and monthly revenue dashboards</strong>, track
        <strong> claim statuses by insurer</strong>, and filter{" "}
        <strong>unpaid claims</strong> for actionable insights.
      </>,
    ],

    tech: ["Python", "OpenCV", "Deepdoctection", "pytesseract", "Celery"],
    startDate: "June 2025",
    endDate: "Present",
  },
  {
    imgSrc: inzone,
    label: "Inzone",
    position: "Software Engineer Intern",
    desc: [
      <>
        Built an end-to-end <strong>AI avatar generation pipeline</strong> in
        Flutter, routing text prompts through a custom{" "}
        <strong>Google Cloud Run</strong> API to <strong>Meshy AI</strong> for
        3D model synthesis (GLB/OBJ), and embedded a{" "}
        <strong>Ready Player Me</strong> iframe editor via a React/Vite
        frontend, enabling users to create personalized 3D characters from a
        single prompt.
      </>,
      <>
        Engineered a real-time <strong>voice conversation system</strong>{" "}
        connecting on-device <strong>speech-to-text</strong>,{" "}
        <strong>ChatGPT</strong> character AI, and{" "}
        <strong>ElevenLabs TTS</strong>, with per-character voice profiles
        stored in <strong>Firebase</strong> Firestore and a coin-based
        monetization layer (25 coins/session) that tracks balance, deducts in a
        transaction, and logs conversation analytics.
      </>,
      <>
        Eliminated <strong>video feed lag</strong> by implementing an LRU video
        player cache (cap: 3 simultaneous players) with visibility-based
        autoplay at 50% viewport threshold; also shipped a{" "}
        <strong>dual user reporting system</strong> covering post and
        participant reports with reason dialogs persisted to{" "}
        <strong>Firebase</strong> Firestore for moderation review.
      </>,
    ],

    tech: ["Python", "Firebase", "Git", "Flask", "Flutter"],
    startDate: "June 2025",
    endDate: "Present",
  },
  {
    imgSrc: umd,
    label: "NEMO Research Assistant",
    position: "Research Intern",
    desc: [
      <>
        Optimized <strong>parallel algorithms</strong> in <strong>C/C++</strong>{" "}
        stellar dynamics code for simulation performance.
      </>,
      <>
        Ported core modules for <strong>cross-platform compatibility</strong>,
        ensuring seamless functionality on both <strong>Windows</strong> and{" "}
        <strong>macOS</strong>.
      </>,
    ],

    tech: ["C++", "C", "Git"],
    startDate: "Feb 2025",
    endDate: "May 2025",
  },
  {
    imgSrc: hancom,
    label: "Hancom",
    position: "Software Engineer Intern",
    desc: [
      <>
        Spearheaded the end-to-end migration of <strong>iOS</strong> and{" "}
        <strong>Android</strong> applications to <strong>Flutter</strong>,
        improving cross-platform compatibility and increasing development
        efficiency by <strong>30%</strong>.
      </>,
      <>
        Collaborated with <strong>6 developers</strong> &{" "}
        <strong>3 designers</strong> to build hi-fi prototypes, improving
        integration and functionality.
      </>,
      <>
        Assisted the team in enhancing development processes, delivering project
        milestones <strong>15%</strong> ahead of schedule.
      </>,
    ],

    tech: ["Flutter", "Dart", "Git", "Figma", "Confluence", "Jira"],
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
    label: "August - Me & Friends Timetable",
    position: "Co-founder",
    desc: [
      <>
        <strong>Co-founded</strong> and led full-stack development of{" "}
        <strong>August</strong>, a college scheduler app published on the{" "}
        <strong>App Store</strong> and <strong>Google Play</strong>, built with{" "}
        <strong>Flutter</strong> for seamless <strong>Android</strong> and{" "}
        <strong>iOS</strong> cross-platform support.
      </>,
      <>
        Engineered a custom{" "}
        <strong>recursive backtracking scheduling algorithm</strong> that
        generates all conflict-free timetable combinations from selected
        courses, filtering by <strong>open seat availability</strong>,{" "}
        <strong>minimum/maximum break intervals</strong>,{" "}
        <strong>consecutive class limits</strong>, and{" "}
        <strong>earliest start time</strong> preferences in real time.
      </>,
      <>
        Built a <strong>Django REST Framework</strong> backend with{" "}
        <strong>PostgreSQL</strong>, <strong>Redis</strong>, and{" "}
        <strong>AWS S3</strong>; implemented{" "}
        <strong>JWT-based authentication</strong> with <strong>Google</strong>{" "}
        and <strong>Apple OAuth</strong> via <strong>django-allauth</strong> and{" "}
        <strong>dj-rest-auth</strong>.
      </>,
      <>
        Developed an <strong>async web scraper</strong> using{" "}
        <strong>BeautifulSoup4</strong> and{" "}
        <strong>ThreadPoolExecutor (20 workers)</strong> to concurrently scrape
        real-time course data (including <strong>open seats</strong>,{" "}
        <strong>waitlist counts</strong>, <strong>instructors</strong>,{" "}
        <strong>meeting times</strong>, and{" "}
        <strong>building/room locations</strong>) from UMD's Testudo across all
        departments and semesters.
      </>,
      <>
        Designed a <strong>social friend system</strong> with time-limited{" "}
        <strong>invite codes</strong>, friend schedule sharing, and a{" "}
        <strong>Group Hangout</strong> feature that computes shared free time
        intervals across multiple users' timetables simultaneously.
      </>,
      <>
        Integrated <strong>20+ RESTful APIs</strong> on the Flutter frontend
        using <strong>Provider</strong> state management; built features
        including <strong>GPA tracking with charts</strong>,{" "}
        <strong>dynamic app icons</strong>, <strong>home screen widgets</strong>
        , <strong>AdMob ads</strong>, <strong>in-app review</strong>, and{" "}
        <strong>OTA hot updates via Shorebird</strong>.
      </>,
      <>
        Shipped through the full product lifecycle: <strong>MVP release</strong>
        , <strong>Beta testing</strong>, <strong>App Store deployment</strong>,
        and iterative updates, with <strong>Firebase Analytics</strong>{" "}
        instrumented throughout key user flows.
      </>,
    ],

    tech: ["Flutter", "Dart", "Python", "REST API", "Django", "Web Scraping"],
    startDate: "Jun 2023",
    endDate: "Present",
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
