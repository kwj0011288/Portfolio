import React from "react";
import ProjectCard from "./Projectcard";
import august from "../assets/projects/august.png";
import coupleai from "../assets/projects/coupleai.png";
import animalmatch from "../assets/projects/animal.jpg";
import DrTeragotchi from "../assets/projects/DrTeragotchi.jpg";
import Portfolio from "../assets//hero.png";
import Ghostdiedie from "../assets/projects/ghostdiedie.png";

export const projects = [
  {
    imgSrc: august,
    title: "August - Automated Course Scheduling",
    role: "Co-Founder & Lead Software Engineer",
    confidential: true,
    isLive: false,
    tags: ["Flutter", "Django REST Framework", "Python", "BeautifulSoup", "Web Scraping"],
    // projectLink: "https://apps.apple.com/app/id6469464765",
    brief:
      "Automated course scheduling app used by 220+ students, generating conflict-free timetables in under 1 minute.",
    description:
      "Co-founded, built, and launched an automated course scheduling app used by 220+ students from June 2023 to May 2025. Built with Flutter and Django REST Framework, the app uses a backtracking algorithm to generate conflict-free timetable options in under 1 minute based on seat availability and student preferences. A multithreaded Python and BeautifulSoup web scraper synchronizes UMD course offerings, seat availability, instructors, and meeting times with the Django backend.",
  },
  {
    imgSrc: coupleai,
    title: "AI Couple Compatibility",
    role: "FULL STACK",
    confidential: false,
    isLive: false,
    tags: [
      "TensorFlow",
      "Image Classification",
      "AWS",
      "Django",
      "React",
      "Flutter",
    ],
    githubLink:
      "https://github.com/kwj0011288/AI-Couple-Compatibility-Scoring-System",
    brief:
      "AI platform trained on 50,000+ couple images to predict relationship compatibility.",
    description:
      "A full-stack AI-powered platform that analyzes over 50,000 couple images to predict relationship compatibility. The web interface is built with React, while the mobile app is developed in Flutter. TensorFlow powers the core image classification model, and AWS with Django handles the backend infrastructure.",
  },
  {
    imgSrc: animalmatch,
    title: "Animal Look-alike Classifier",
    role: "ML ENGINEER",
    confidential: false,
    isLive: false,
    tags: ["CNN", "OpenCV", "Python"],
    githubLink: "https://github.com/kwj0011288/Face2AnimalClassifier",
    brief:
      "CNN + OpenCV model that maps your face to the animal you most resemble.",
    description:
      "A computer vision project that uses CNNs and OpenCV to predict which animal a person resembles. The system analyzes facial features and maps them to an animal class.",
  },
  {
    imgSrc: DrTeragotchi,
    title: "Dr. Teragotchi",
    role: "MOBILE & AI",
    confidential: false,
    isLive: false,
    tags: ["Flutter", "FastAPI", "Supabase", "OpenAI", "PostgreSQL"],
    githubLink: "https://github.com/kwj0011288/Dr-Teragotchi",
    brief:
      "AI virtual pet for mental well-being: daily check-ins, emotional responses, and gamified growth.",
    description:
      "An AI pet that responds to your emotions for mental well-being, with daily chat, points, and growth in a gamified format.",
  },
  {
    imgSrc: Ghostdiedie,
    title: "Ghostdiedie - Motion-Controlled 3D Fighter",
    role: "Team Lead & Full-Stack Developer",
    confidential: false,
    isLive: false,
    tags: ["React", "Three.js", "FastAPI", "MediaPipe", "WebSockets"],
    projectLink: "https://ghostdiedie.surf/",
    githubLink: "https://github.com/kwj0011288/ghostdiedie-bitcamp2026",
    brief:
      "Webcam-controlled, two-player 3D fighting game built by a 4-person team in April 2026.",
    description:
      "Led a 4-person team to build a webcam-controlled, two-player 3D fighting game in April 2026, personally developing the React/Three.js frontend and FastAPI backend. Implemented MediaPipe gesture controls with player calibration, coordinate correction, visibility filtering, and cooldown tuning, plus animated combat and custom face textures attached to avatar skeletons. WebSockets synchronize player movement, server-calculated damage, and round countdowns; corrected player assignment and prevented premature attacks.",
  },
  {
    imgSrc: Portfolio,
    title: "Portfolio",
    role: "FRONTEND",
    confidential: false,
    isLive: true,
    tags: ["React", "Tailwind CSS", "JavaScript", "Vite"],
    projectLink: "https://kimwonjae.com",
    githubLink: "https://github.com/kwj0011288/Portfolio",
    brief: "This portfolio, built with React, Tailwind, and Vite.",
    description:
      "This portfolio website showcases projects and skills with interactive 3D elements and a clean, readable layout.",
  },
];

const Projects = () => {
  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <div className="container">
        <h2 id="projects-title" className="headline-2 mb-8 reveal-up">
          Projects
        </h2>
        <p className="text-zinc-400 mt-3 mb-10 max-w-[50ch] reveal-up">
          Case studies in AI products, mobile apps, web engineering, and
          full-stack software delivery.
        </p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} classes="project-reveal" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
