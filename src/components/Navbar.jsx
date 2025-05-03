import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

const Navbar = ({ navOpen }) => {
    const activeBox = useRef(null);
    const [activeSection, setActiveSection] = useState('home');
    const mounted = useRef(false);

    const updateActiveBox = (element) => {
        if (!element || !activeBox.current) return;

        // Get parent nav element
        const parentRect = element.parentElement.getBoundingClientRect();
        // Get current element rect
        const rect = element.getBoundingClientRect();

        // Calculate exact positioning
        const top = Math.round(rect.top - parentRect.top);
        const left = Math.round(rect.left - parentRect.left);
        const width = Math.round(rect.width);
        const height = Math.round(rect.height);

        // Fade out and make transparent
        activeBox.current.style.opacity = '0';
        activeBox.current.style.backgroundColor = 'transparent';

        // After a short delay, update position and fade in
        setTimeout(() => {
            // Apply precise positioning
            activeBox.current.style.top = `${top}px`;
            activeBox.current.style.left = `${left}px`;
            activeBox.current.style.width = `${width}px`;
            activeBox.current.style.height = `${height}px`;

            // Fade in with proper color
            setTimeout(() => {
                activeBox.current.style.backgroundColor = ''; // Use default color from CSS
                activeBox.current.style.opacity = '1';
            }, 50);
        }, 150);
    };


    const handleClick = (event, link) => {
        event.preventDefault();
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });

        const current = event.currentTarget;
        current.classList.add('active');

        // Fade transition for indicator when clicking
        if (activeBox.current) {
            activeBox.current.style.opacity = '0';
            activeBox.current.style.backgroundColor = 'transparent';

            setTimeout(() => {
                updateActiveBox(current);
            }, 150);
        } else {
            updateActiveBox(current);
        }

        const target = document.querySelector(link);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            setActiveSection(link.substring(1));
        }
    };

    // Initial setup effect - runs once on mount
    useEffect(() => {
        mounted.current = true;

        // Hide active-box initially
        if (activeBox.current) {
            activeBox.current.style.opacity = '0';
            activeBox.current.style.backgroundColor = 'transparent';
        }

        // First check quickly after render but keep it invisible
        requestAnimationFrame(() => {
            if (!mounted.current || !activeBox.current) return;

            const initialActive = document.querySelector('.nav-link.active');
            if (initialActive) {
                const parentRect = initialActive.parentElement.getBoundingClientRect();
                const rect = initialActive.getBoundingClientRect();

                // Position without showing
                activeBox.current.style.top = `${Math.round(rect.top - parentRect.top)}px`;
                activeBox.current.style.left = `${Math.round(rect.left - parentRect.left)}px`;
                activeBox.current.style.width = `${Math.round(rect.width)}px`;
                activeBox.current.style.height = `${Math.round(rect.height)}px`;
            } else {
                // If no active link, set the first one (Home) as active
                const homeLink = document.querySelector('.nav-link[href="#home"]');
                if (homeLink) {
                    homeLink.classList.add('active');

                    const parentRect = homeLink.parentElement.getBoundingClientRect();
                    const rect = homeLink.getBoundingClientRect();

                    // Position without showing
                    activeBox.current.style.top = `${Math.round(rect.top - parentRect.top)}px`;
                    activeBox.current.style.left = `${Math.round(rect.left - parentRect.left)}px`;
                    activeBox.current.style.width = `${Math.round(rect.width)}px`;
                    activeBox.current.style.height = `${Math.round(rect.height)}px`;
                }
            }
        });

        // Wait for component to fully render, then make indicator visible
        setTimeout(() => {
            if (!mounted.current || !activeBox.current) return;

            // Now make it visible with proper color
            activeBox.current.style.backgroundColor = ''; // Use default color from CSS
            activeBox.current.style.opacity = '1';
        }, 800);

        return () => {
            mounted.current = false;
        };
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const sections = navItems.map(item => item.link.substring(1));
            let foundActive = false;

            // Check if we're at the bottom of the page
            const isAtBottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 100;

            if (isAtBottom) {
                // We're near the bottom, so activate the last section (Contact)
                setActiveSection('contact');
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                const contactLink = document.querySelector('.nav-link[href="#contact"]');
                if (contactLink) {
                    contactLink.classList.add('active');
                    updateActiveBox(contactLink);
                }
                return;
            }

            // Otherwise check each section normally
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
                    foundActive = true;
                    break;
                }
            }

            // If no section was found to be active and we're scrolled down
            // This helps with gaps between sections
            if (!foundActive && window.pageYOffset > 100) {
                // Find the section closest to the viewport
                let closestSection = null;
                let closestDistance = Infinity;

                for (const section of sections) {
                    const element = document.getElementById(section);
                    if (!element) continue;

                    const rect = element.getBoundingClientRect();
                    const distance = Math.abs(rect.top);

                    if (distance < closestDistance) {
                        closestDistance = distance;
                        closestSection = section;
                    }
                }

                if (closestSection && activeSection !== closestSection) {
                    setActiveSection(closestSection);
                    document.querySelectorAll('.nav-link').forEach(link => {
                        link.classList.remove('active');
                    });

                    const activeLink = document.querySelector(`.nav-link[href="#${closestSection}"]`);
                    if (activeLink) {
                        activeLink.classList.add('active');
                        updateActiveBox(activeLink);
                    }
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
            <div
                className="active-box"
                ref={activeBox}
                style={{
                    position: 'absolute',
                    transition: 'opacity 0.2s ease-in-out, background-color 0.2s ease-in-out',
                    opacity: '1',
                    zIndex: -1
                }}
            ></div>
        </nav>
    );
};

Navbar.propTypes = {
    navOpen: PropTypes.bool.isRequired
};

export default Navbar;
