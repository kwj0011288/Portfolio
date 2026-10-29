import React, { useEffect, useState } from "react";
import EmployeeCard from "./Employee_card/employee_card";

const MOBILE_QUERY = "(max-width: 767px)";

// 상태 정보: 필요한 만큼 추가 가능
const statusMap = {
  available: {
    label: "Available for Work",
    color: "bg-emerald-400",
    ping: "animate-ping",
  },
  working: {
    label: "Currently Working",
    color: "bg-blue-400",
    ping: "animate-ping",
  },
  internship: {
    label: "Open to Internships",
    color: "bg-yellow-400",
    ping: "animate-ping",
  },
  incomingIntern: {
    label: "Incoming Intern",
    color: "bg-purple-400",
    ping: "animate-ping",
  },
  unavailable: {
    label: "Not Available",
    color: "bg-red-400",
    ping: "animate-none",
  },
};

// 바꿔가면서 쓸 수 있음
const currentStatus = "working"; // "working", "internship", "unavailable"

const Hero = () => {
  const status = statusMap[currentStatus];
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(MOBILE_QUERY).matches : false,
  );

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY);
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <div>
      <section id="about" className="relative overflow-visible">
        <div className="absolute inset-x-0 top-0 bottom-12 z-0 w-full max-md:blur-[4px] max-md:opacity-[0.45] max-md:dark:opacity-[0.35] md:bottom-auto md:h-[min(100dvh,960px)]">
          <EmployeeCard isMobile={isMobile} />
        </div>

        <div className="relative z-10 pointer-events-none">
          <div className="container">
            <div className="w-full max-w-3xl pt-28 pb-10 lg:pt-40 lg:pb-20 lg:w-[60%] xl:w-[55%]">
              <div className="reveal-up mb-5 flex items-center gap-2 text-sm tracking-wide text-zinc-500 dark:text-zinc-400 lg:mb-6">
                <span
                  className={`relative inline-flex h-2 w-2 rounded-full ${status.color}`}
                >
                  <span
                    className={`absolute inset-0 rounded-full ${status.color} ${status.ping}`}
                  />
                </span>
                <span className="font-medium text-zinc-700 dark:text-zinc-300">
                  {status.label}
                </span>
              </div>
              {/* Reference-style headline: I am [name] / role */}
              <h1 className="reveal-up text-pretty">
                <span className="text-[2rem] font-normal leading-[1.15] tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12]">
                  I am{" "}
                </span>
                <span className="headline-1 text-[2rem] font-semibold leading-[1.15] sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12]">
                  Wonjae Kim
                </span>
              </h1>
              <p className="mt-1 text-pretty text-[2rem] font-normal leading-[1.15] tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl lg:mt-2 lg:text-[2.75rem] lg:leading-[1.12]">
                a Software Engineer
              </p>

              <p className="mt-8 max-w-xl text-pretty text-lg font-normal leading-relaxed text-zinc-900 dark:text-zinc-400 lg:mt-10 lg:text-xl">
                Full-stack software engineer focused on AI automation, mobile
                apps, SaaS products, and production backend systems.
              </p>

              <p className="mt-6 max-w-xl text-pretty text-base font-normal leading-relaxed text-zinc-900 dark:text-zinc-100 lg:mt-8">
                I build reliable products across React, Flutter, Python, and
                cloud infrastructure, with recent work spanning OCR pipelines,
                real-time apps, and AI-powered user experiences.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
