import React from 'react';
import logo from '../assets/hero.png';
const aboutItems = [
    {
        label: 'Project done',
        number: 4
    },
    {
        label: 'Years of experience',
        number: 3
    }
];

const About = () => {
    return (
        <section id="about" className="section">
            <div className="container reveal-up">
                <h2 className='headline-2 mb-8 reveal-up'>
                    About Me
                </h2>
                <div className="bg-zinc-800/50 p-7 rounded-2xl md:p-12 ring-1 ring-zinc-50/10 hover:ring-zinc-50/20 transition-all">
                    <p className='text-zinc-300 mb-4 md:mb-8 md:text-xl md:max-w-[60ch] '>
                        Hi, I am Wonjae Kim, a computer science student who enjoys building tools that are both useful and meaningful.
                        I focus on creating clean and functional systems that solve real problems. 
                        As a full-stack developer, I work across both frontend and backend to bring complete solutions to life. 
                        From mobile apps to machine learning models, I enjoy turning ideas into software that is both functional and visually appealing.
                        I believe good technology comes from a mix of logic, design, and empathy.
                        <br />
                        <br />
                        This portfolio shows my work as a developer, researcher, and collaborator. It includes projects that reflect my skills in full-stack development, machine learning, and user experience design. You will see how I apply my knowledge to real situations, from academic research to internships and personal projects. I hope this gives you a clear view of what I do and what I aim to achieve.
                    </p>

                    <div className="flex felx-wrap items-center gap-4 md:gap-7">
                        {
                            aboutItems.map(({ label, number }, key) => (
                                <div key={key} className="flex flex-col items-center gap-2">
                                    <div className="flex items-center md:mb-2 gap-2">
                                        <span className="text-4xl font-semibold md:text-5xl">{number}</span>
                                        <span className="text-2xl font-semibold md:text-3xl">+</span>
                                    </div>
                                    <p className="text-sm text-zinc-400">{label}</p>
                                </div>
                            ))
                        }
                        <img src={logo}
                            alt=""
                            width={30}
                            height={30}
                            className='ml-auto md:w-[40px] md:h-[40px]'
                        />
                    </div>

                </div>
            </div>
        </section>
    );
};

export default About;