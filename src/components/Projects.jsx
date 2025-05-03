import React from 'react';
import ProjectCard from './Projectcard';
import august from '../assets/projects/august.png';
import coupleai from '../assets/projects/coupleai.png';
import animalmatch from '../assets/projects/animal.jpg';
import DrTeragotchi from '../assets/projects/DrTeragotchi.jpg';
const projects = [
    {
        imgSrc: august,
        title: 'August – Me & Friends Timetable',
        tags: ['Flutter', 'REST API', 'Django', 'Web Scraping'],
        projectLink: 'https://www.augustapp.one/get',
        description: 'A mobile-first scheduling app for University of Maryland students that automatically generates course timetables based on class availability and user preferences. Built with Flutter and Python (Django), the app allows users to apply filters like no morning classes or back-to-back sessions, and view friends’ schedules to find shared free time. A web version is currently in development to expand access across platforms.'
    },
    {
        imgSrc: coupleai,
        title: 'AI Couple Compatibility',
        tags: ['TensorFlow', 'Image Classification', 'AWS', 'Django', 'React', 'Flutter'],
        projectLink: 'https://kissing-booth-ai.com',
        githubLink: 'https://github.com/kwj0011288/AI-Couple-Compatibility-Scoring-System',
        description: 'A full-stack AI-powered platform that analyzes over 50,000 couple images to predict relationship compatibility. The web interface is built with React, while the mobile app is developed in Flutter. TensorFlow powers the core image classification model, and AWS with Django handles the backend infrastructure. The system delivers a smooth experience across devices from photo upload to final prediction, achieving 95% model accuracy.'
    },
    {
        imgSrc: animalmatch,
        title: 'Animal Look-alike Classifier',
        tags: ['CNN', 'OpenCV', 'Python'],
        projectLink: '',
        githubLink: 'https://github.com/kwj0011288/Face2AnimalClassifier',
        description: 'A computer vision project that uses CNNs and OpenCV to predict which animal a person resembles. The system analyzes facial features and maps them to an animal class. It showcases custom model training, real-time feedback, and creative image processing techniques.'
    },
    {
        imgSrc: DrTeragotchi,
        title: 'Dr. Teragotchi',
        tags: ['Flutter', 'FastAPI', 'Supabase', 'OpenAI', 'PostgreSQL'],
        projectLink: '',  // Add link if available
        githubLink: 'https://github.com/kwj0011288/Dr-Teragotchi',
        description: 'Dr. Theragotchi is a unique AI pet designed to respond to your emotions, offering a fun and engaging way to boost mental well-being by creating a personal connection that evolves over time. By chatting daily, earning points, and watching your pet grow, users not only enjoy emotional support but also track their mental health in a gamified format. Just like how gamers search for Traffic Rider APK iOS to enhance their racing experience on Apple devices, Dr. Theragotchi adds that same level of personalized enjoyment and interaction—only with a meaningful focus on emotional wellness.'
    }

];
const Projects = () => {
    return (
        <section id="projects" className='section'>
            <div className='container'>
                <h2 className='headline-2 mb-8 reveal-up'>
                    Projects
                </h2>
                <p className='text-zinc-400 mt-3 mb-8 max-w-[50ch] reveal-up'>
                    Solving Real Problems Through Innovative Code and Design
                </p>
                <div className="grid gap-x-4 gap-y-5 grid-cols-[repeat(auto-fill,minmax(340px,1fr))] reveal-up">

                    {
                        projects.map(({ imgSrc, title, tags, projectLink, githubLink, description }, index) => (
                            <ProjectCard
                                key={index}
                                imgSrc={imgSrc}
                                title={title}
                                tags={tags}
                                projectLink={projectLink}
                                githubLink={githubLink}
                                description={description}
                                classes='reveal-up'
                            />
                        ))
                    }
                </div>
            </div>
        </section>
    );
};

export default Projects;