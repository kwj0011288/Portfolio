import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

const Navbar = ({ navOpen }) => {
    const activeBox = useRef(null);
    const [activeSection, setActiveSection] = useState('home');

    const updateActiveBox = (element) => {
        if (!element || !activeBox.current) return;

        const parentRect = element.parentElement.getBoundingClientRect();
        const rect = element.getBoundingClientRect();

        activeBox.current.style.top = `${rect.top - parentRect.top}px`;
        activeBox.current.style.left = `${rect.left - parentRect.left}px`;
        activeBox.current.style.width = `${rect.width}px`;
        activeBox.current.style.height = `${rect.height}px`;
    };


    const handleClick = (event, link) => {
        event.preventDefault();
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });

        const current = event.currentTarget;
        current.classList.add('active');
        updateActiveBox(current);

        const target = document.querySelector(link);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            setActiveSection(link.substring(1));
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const sections = navItems.map(item => item.link.substring(1));
            for (const section of sections) {
                const element = document.getElementById(section);
                if (!element) continue;

                const rect = element.getBoundingClientRect();
                if (rect.top <= 150 && rect.bottom >= 150) {
                    if (activeSection !== section) {
                        setActiveSection(section);
                        document.querySelectorAll('.nav-link').forEach(link => {
                            link.classList.remove('active');
                        });

                        const activeLink = document.querySelector(`.nav-link[href="#${section}"]`);
                        if (activeLink) {
                            activeLink.classList.add('active');
                            updateActiveBox(activeLink);
                        }
                    }
                    break;
                }
            }
        };

        const defaultActive = document.querySelector('.nav-link.active');
        if (defaultActive) {
            updateActiveBox(defaultActive);
        }

        const handleResize = () => {
            const current = document.querySelector('.nav-link.active');
            if (current) updateActiveBox(current);
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [activeSection]);

    const navItems = [
        { label: 'Home', link: '#home' },
        { label: 'About', link: '#about' },
        { label: 'Skills', link: '#skills' },
        { label: 'Experience', link: '#work' },
        { label: 'Projects', link: '#projects' },
        { label: 'Contact', link: '#contact', className: 'md:hidden' }
    ];

    return (
        <nav
            className={`relative navbar ${navOpen ? 'active' : ''} 
            min-w-40 p-2 pt-1
            bg-zinc-50/10 rounded-2xl ring-inset ring-1 ring-zinc-50/5 
            scale-90 isolate blur-sm opacity-0 invisible transition-all duration-300 ease-in-out 
            md:static md:flex md:items-center md:mt-0 md:opacity-100 md:blur-0 
            md:visible md:scale-100 backdrop-blur-2xl
            light:bg-zinc-800/10 light:ring-zinc-800/5`}
        >

            {navItems.map(({ label, link, className = '' }) => (
                <a
                    key={label}
                    href={link}
                    className={`nav-link ${link === '#' + activeSection ? 'active' : ''} ${className}`}
                    onClick={(e) => handleClick(e, link)}
                >
                    {label}
                </a>
            ))}
            <div className="active-box" ref={activeBox}></div>
        </nav>
    );
};

Navbar.propTypes = {
    navOpen: PropTypes.bool.isRequired
};

export default Navbar;
