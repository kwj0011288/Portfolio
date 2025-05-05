import React from 'react';

const PersonalStatement = () => {
    return (
        <section id="personal-statement" className="section">
            <div className="container reveal-up">
                <h2 className='headline-2 mb-8 reveal-up'>
                    Personal Statement
                </h2>

                <div className="bg-zinc-800/50 p-7 rounded-2xl md:p-12 ring-1 ring-zinc-50/10 hover:ring-zinc-50/20 transition-all dark:bg-zinc-800/50 dark:ring-zinc-50/10 dark:hover:ring-zinc-50/20">
                    <div className="space-y-8">
                        <div className="work-reveal">
                            <h3 className="text-2xl font-medium mb-3 text-zinc-800 dark:text-zinc-50">
                                When did you become interested in computer science?
                            </h3>
                            <p className="text-zinc-700 dark:text-zinc-300 md:text-lg leading-relaxed">
                                I first became interested in computer science after moving to the United States from Korea. Before that, I studied violin, but learning how software works and seeing how code could create something useful really changed the way I thought. I liked how programming could be both clear and creative. It helped me move from expressing emotion through music to solving problems with logic and care.
                            </p>
                        </div>

                        <div className="work-reveal">
                            <h3 className="text-2xl font-medium mb-3 text-zinc-800 dark:text-zinc-50">
                                What project or experience helped shape your direction?
                            </h3>
                            <p className="text-zinc-700 dark:text-zinc-300 md:text-lg leading-relaxed">
                                One of the most important experiences that helped me find my path was building an app called August. I made it with a friend for students at the University of Maryland. Every semester, students struggled with making class schedules. I felt that pain too, so we decided to fix it. We built the app with Flutter, and now it helps hundreds of students make better schedules. It even helps them match times with their friends. Working on August showed me how important it is to understand how users feel, not just how the software works.
                            </p>
                        </div>

                        <div className="work-reveal">
                            <h3 className="text-2xl font-medium mb-3 text-zinc-800 dark:text-zinc-50">
                                What kind of problems do you want to solve through technology?
                            </h3>
                            <p className="text-zinc-700 dark:text-zinc-300 md:text-lg leading-relaxed">
                                After that, I worked on many projects, from mobile apps to AI systems that match couples, and research that used simulations. I like working on both the design and the code. But what excites me most is using technology to solve real problems people face. That could be stress, confusion, or even the feeling of being alone. Whether I build a model to help people make better choices or a simple app that makes life smoother, I want to make tools that are helpful, kind, and easy to use.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PersonalStatement; 