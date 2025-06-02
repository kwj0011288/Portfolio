import React from "react";
import logo from "../assets/hero.png";
const aboutItems = [
  {
    label: "Project done",
    number: 6,
  },
  {
    label: "Years of experience",
    number: 3,
  },
];

const About = () => {
  return (
    <section id="about" className="section">
      <div className="container reveal-up">
        <h2 className="headline-2 mb-8 reveal-up">About Me</h2>
        <div className="bg-zinc-800/50 p-7 rounded-2xl md:p-12 ring-1 ring-zinc-50/10 hover:ring-zinc-50/20 transition-all">
          <p className="text-zinc-300 mb-4 md:mb-8 md:text-xl md:max-w-[60ch] ">
            Hi, I am Wonjae Kim, a computer science student and full-stack
            developer passionate about building software that makes an impact. I
            focus on creating clean, scalable systems that solve real-world
            problems, whether through intuitive mobile apps, robust backend
            services, or intelligent machine learning pipelines.
            <br />
            <br />
            My experience spans cross-platform app development, document
            processing with advanced OCR and computer vision, 3D UI integration,
            and high-performance scientific computing. I have contributed to
            startups, research labs, and industry teams, delivering polished
            products and collaborating closely with designers, engineers, and
            researchers.
            <br />
            <br />
            This portfolio highlights my work as a developer, researcher, and
            collaborator across diverse domains. You will find projects that
            demonstrate my skills in Flutter, Python, machine learning, C++, and
            UI/UX design. From leading a popular student scheduling app to
            accelerating EOB document processing, I enjoy turning ideas into
            solutions that are both technically sound and user-friendly.
          </p>

          <div className="flex felx-wrap items-center gap-4 md:gap-7">
            {aboutItems.map(({ label, number }, key) => (
              <div key={key} className="flex flex-col items-center gap-2">
                <div className="flex items-center md:mb-2 gap-2">
                  <span className="text-4xl font-semibold md:text-5xl">
                    {number}
                  </span>
                  <span className="text-2xl font-semibold md:text-3xl">+</span>
                </div>
                <p className="text-sm text-zinc-400">{label}</p>
              </div>
            ))}
            <img
              src={logo}
              alt=""
              width={30}
              height={30}
              className="ml-auto md:w-[40px] md:h-[40px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
