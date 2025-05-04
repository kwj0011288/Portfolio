import React from 'react'
import WorkCard from './Workcard';
import august from '../assets/works/august.png';
import hancom from '../assets/works/hancom.jpeg';
import git from '../assets/works/git.png';
import umd from '../assets/works/umd.svg';
import military from '../assets/works/military.jpeg';
import inzone from '../assets/works/inzone.png';

const workItem = [
    {
        imgSrc: inzone,
        label: 'Inzone',
        position: 'Software Engineer Intern',
        desc: [
            'Incoming Intern...'
        ],
        tech: ['Python', 'Firebase', 'Git', 'Flutter'],
        startDate: 'June 2025',
        endDate: 'August 2025'
    },
    {
        imgSrc: umd,
        label: 'NEMO Research Assistant',
        position: 'Research Intern',
        desc: [
            'Optimized parallel algorithms in C/C++ stellar dynamics code for simulation performance',
            'Ported core modules for cross-platform compatibility, ensuring seamless functionality on both Windows and macOS'
        ],
        tech: ['C++', 'C', 'Git'],
        startDate: 'Feb 2025',
        endDate: 'Present'
    },
    {
        imgSrc: hancom,
        label: 'Hancom',
        position: 'Software Engineer Intern',
        desc: [
            'Spearheaded the end-to-end migration of iOS and Android applications to Flutter, significantly improving cross-platform compatibility and increasing development efficiency by 30%',
            'Collaborated with 6 developers & 3 designers to build hi-fi prototypes, improving integration and functionality',
            'Assisted the team in enhancing development processes, delivering project milestones 15% ahead of schedule'
        ],
        tech: ['Flutter', 'Dart', 'Git', 'Figma', 'Confluence', 'Jira'],
        startDate: 'Jun 2024',
        endDate: 'Aug 2024'
    },
    {
        imgSrc: umd,
        label: 'University of Maryland (TA)',
        position: 'Teaching Assistant',
        desc: [
            'Taught Korean language and culture to 20+ students using interactive methods',
            'Collaborated with faculty to design and revise curriculum aligned with standards'
        ],
        tech: ['Google Slides', 'Zoom', 'Curriculum Design', 'Korean', 'English'],
        startDate: 'Aug 2023',
        endDate: 'May 2024'
    },
    {
        imgSrc: august,
        label: 'August - Me & Friends Timetable',
        position: 'Co-founder',
        desc: [
            'Co-founded and led development of "August", a college scheduler app for Android and iOS using Flutter, with a focus on user-friendly interface and cross-platform compatibility',
            'Created an innovative scheduling algorithm analyzing available slots, open seats, and user preferences',
            'Integrated 20+ RESTful APIs and utilized web scraping for real-time data from school websites',
            'Acquired essential skills in all steps of MVP release, Beta testing, and skills in collaboration'
        ],
        tech: ['Flutter', 'Dart', 'Python', 'REST API', 'Django', 'Web Scraping'],
        startDate: 'Jun 2023',
        endDate: 'Present'
    },
    {
        imgSrc: military,
        label: 'Front Observer & DMZ Police',
        position: 'Military Service',
        desc: [
            'Served 5 months at the DMZ as a front observer with the 1st Artillery Division in a high-security border zone',
            'Promoted to Sergeant, led team operations, and received an honorable discharge for discipline and dedication'
        ],
        tech: ['Leadership', 'Field Ops', 'Security Protocol', 'Korean'],
        startDate: 'Jan 2021',
        endDate: 'Jul 2022'
    },
    {
        imgSrc: git,
        label: 'G.I.T',
        position: 'Software Engineer Intern',
        desc: [
            'Worked on advanced automotive diagnostics targeting next-gen safety and eco-friendly technologies',
            'Developed advanced electric vehicle diagnostics, aligning with trends in autonomy and connectivity',
            'Improved vehicle performance, quality, and inspection technologies by implementing strategic enhancements'
        ],
        tech: ['Kotlin', 'Android', 'Git'],
        startDate: 'Jun 2019',
        endDate: 'Aug 2019'
    }
];

const Work = () => {
    return (
        <section id="work" className="section">
            <div className="container px-3 md:px-4">
                <h2 className='headline-2 reveal-up'>Work Experience</h2>

                <p className='text-zinc-500 dark:text-zinc-400 mt-3 mb-8 max-w-[50ch] reveal-up'>
                    My Journey as a Developer, Researcher, and Innovator
                </p>

                {/* 워크 카드 컨테이너 */}
                <div className="relative work-reveal">
                    {/* Timeline line - 모바일에서는 숨김, 중간 크기 이상에서만 표시 */}
                    <div className="hidden md:block absolute left-[115px] top-6 bottom-0 w-0.5 bg-gradient-to-b from-sky-400/50 to-emerald-400/50 rounded-full"></div>

                    <div className="relative">
                        {workItem.map((experience, key) => (
                            <div key={key} className="reveal-up">
                                <WorkCard experience={experience} isLast={key === workItem.length - 1} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Work;