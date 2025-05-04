import React from 'react'
import SkillCard from './Skillcard';
import c from '../assets/skills/c.svg';
import css from '../assets/skills/css.svg';
import dart from '../assets/skills/dart.svg';
import flutter from '../assets/skills/flutter.svg';
import html from '../assets/skills/html.svg';
import java from '../assets/skills/java.svg';
import javascript from '../assets/skills/javascript.svg';
import ocaml from '../assets/skills/ocaml.svg';
import kotlin from '../assets/skills/kotlin.svg';
import python from '../assets/skills/python.svg';
import rust from '../assets/skills/rust.svg';
import swift from '../assets/skills/swift.svg';
import tailwindcss from '../assets/skills/tailwindcss.svg';
import react from '../assets/skills/react.svg';

const skillItem = [
    // 1. Programming Language
    {
        imgSrc: python,
        label: 'Python',
        desc: 'Programming Language'
    },
    {
        imgSrc: java,
        label: 'Java',
        desc: 'Programming Language'
    },
    {
        imgSrc: c,
        label: 'C',
        desc: 'System Programming'
    },
    {
        imgSrc: ocaml,
        label: 'OCaml',
        desc: 'Functional Programming'
    },
    {
        imgSrc: html,
        label: 'HTML',
        desc: 'User Interface'
    },
    {
        imgSrc: css,
        label: 'CSS',
        desc: 'User Interface'
    },
    {
        imgSrc: javascript,
        label: 'JavaScript',
        desc: 'Programming Language'
    },
    {
        imgSrc: tailwindcss,
        label: 'TailwindCSS',
        desc: 'User Interface'
    },
    {
        imgSrc: dart,
        label: 'Dart',
        desc: 'Programming Language'
    },


    {
        imgSrc: kotlin,
        label: 'Kotlin',
        desc: 'Programming Language'
    },

    {
        imgSrc: swift,
        label: 'Swift',
        desc: 'Programming Language'
    },

    // 2. Functional Programming


    // 3. System Programming

    {
        imgSrc: rust,
        label: 'Rust',
        desc: 'System Programming'
    },

    // 4. User Interface / Frontend


    // 5. Framework
    {
        imgSrc: react,
        label: 'React',
        desc: 'Framework'
    },
    {
        imgSrc: flutter,
        label: 'Flutter',
        desc: 'Framework'
    }
];



const Skill = () => {
    // 각 카드에 대한 딜레이 계산 함수
    const getAnimationDelay = (index) => {
        // 기본 딜레이 0.1초에 인덱스에 따라 0.05초씩 증가
        return `${0.1 + index * 0.05}s`;
    };

    return (
        <section id="skills" className='section py-16'>
            <div className='container'>
                <h2 className='headline-2 reveal-up'>
                    My Skills
                </h2>
                <p className='text-zinc-500 dark:text-zinc-400 mt-3 mb-8 max-w-[50ch] reveal-up'>
                    Discover the powerful tools and technologies I use to create exceptional, high-performing websites & applications.
                </p>

                <div className='grid gap-3 grid-cols-[repeat(auto-fill,minmax(250px,1fr))]'>
                    {
                        skillItem.map(({ imgSrc, label, desc }, index) => (
                            <div
                                className="reveal-up"
                                style={{ animationDelay: getAnimationDelay(index) }}
                                key={index}
                            >
                                <SkillCard
                                    imgSrc={imgSrc}
                                    label={label}
                                    desc={desc}
                                    className=''
                                />
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    );
}

export default Skill;