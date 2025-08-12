import React from "react";
import WorkCard from "./Workcard";
import august from "../assets/works/august.png";
import hancom from "../assets/works/hancom.jpeg";
import git from "../assets/works/git.png";
import umd from "../assets/works/umd.svg";
import military from "../assets/works/military.jpeg";
import inzone from "../assets/works/inzone.png";
import noIcon from "../assets/works/no_icon.png";

const workItem = [
  {
    imgSrc: noIcon,
    label: "EOB Automation Processor",
    position: "Software Engineer Intern",
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
        Developed and deployed{" "}
        <strong>AI character generation algorithms</strong>, integrating them
        into the frontend to create interactive experiences, resulting in higher{" "}
        <strong>user engagement</strong> and <strong>retention</strong>.
      </>,
      <>
        Integrated <strong>ChatGPT</strong>, <strong>Ready Player Me</strong>,{" "}
        <strong>Meshy AI</strong>, and connected <strong>ElevenLabs</strong>{" "}
        with <strong>Firebase</strong> to enable real-time voice conversations
        using in-app currency.
      </>,
      <>
        Optimized <strong>frontend performance</strong> by fixing{" "}
        <strong>lag issues</strong> and implemented a{" "}
        <strong>user reporting system</strong> to enhance community safety.
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
        <strong>Co-founded</strong> and led development of{" "}
        <strong>"August"</strong>, a college scheduler app for{" "}
        <strong>Android</strong> and <strong>iOS</strong> using{" "}
        <strong>Flutter</strong>, focusing on a user-friendly interface and
        cross-platform compatibility.
      </>,
      <>
        Created an innovative <strong>scheduling algorithm</strong> analyzing
        available slots, open seats, and user preferences.
      </>,
      <>
        Integrated <strong>20+ RESTful APIs</strong> and utilized{" "}
        <strong>web scraping</strong> for real-time data from school websites.
      </>,
      <>
        Gained experience in <strong>MVP release</strong>,{" "}
        <strong>Beta testing</strong>, and team collaboration.
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
    <section id="work" className="section pb-10">
      <div className="container px-3 md:px-4">
        <h2 className="headline-2 reveal-up">Work Experience</h2>

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
