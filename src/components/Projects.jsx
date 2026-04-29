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
    title: "August - Me & Friends Timetable",
    role: "Frontend Developer",
    confidential: true,
    isLive: false,
    tags: ["Flutter", "REST API", "Django", "Web Scraping"],
    projectLink: "https://apps.apple.com/app/id6469464765",
    brief:
      "Smart timetable app for UMD students — filters, friend schedules, and shared free time.",
    description:
      "A mobile-first scheduling app for University of Maryland students that automatically generates course timetables based on class availability and user preferences. Built with Flutter and Python (Django), the app allows users to apply filters like no morning classes or back-to-back sessions, and view friends' schedules to find shared free time. A web version is currently in development to expand access across platforms.",
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
      "AI virtual pet for mental well-being — daily check-ins, emotional responses, and gamified growth.",
    description:
      "An AI pet that responds to your emotions for mental well-being — daily chat, points, and growth in a gamified format.",
  },
  {
    imgSrc: Ghostdiedie,
    title: "Ghostdiedie",
    role: "FULLSTACK & CV",
    confidential: false,
    isLive: true,
    tags: ["React", "Three.js", "FastAPI", "Supabase", "WebRTC", "MediaPipe"],
    projectLink: "https://ghostdiedie.surf/",
    githubLink: "https://github.com/kwj0011288/ghostdiedie-bitcamp2026",
    brief:
      "Browser 1v1 3D fighter where your webcam pose controls attacks — no install needed.",
    description:
      "Browser-based 1v1 3D fighting game: webcam pose drives attacks, FastAPI + WebSocket combat, WebRTC live video, Supabase for users and matches — no app install.",
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
    brief: "This portfolio — built with React, Tailwind, and Vite.",
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
