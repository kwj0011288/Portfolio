import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

const Navbar = ({ navOpen }) => {
    const activeBox = useRef(null);
    const [activeSection, setActiveSection] = useState('home');
    const [prevSection, setPrevSection] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(() =>
        document.documentElement.classList.contains('dark')
    );
    const mounted = useRef(false);

    // 다크 모드 변경 감지 함수
    const updateThemeColors = () => {
        const dark = document.documentElement.classList.contains('dark');
        setIsDarkMode(dark);

        if (activeBox.current) {
            activeBox.current.style.backgroundColor = dark
                ? 'rgba(255, 255, 255, 1)'
                : 'rgba(24, 24, 27, 1)';
        }
    };

    const navItems = [
        { label: 'Home', link: '#home' },
        { label: 'About', link: '#about' },
        { label: 'Personal Statement', link: '#personal-statement' },
        { label: 'Skills', link: '#skills' },
        { label: 'Experience', link: '#work' },
        { label: 'Projects', link: '#projects' },
        { label: 'Contact', link: '#contact', className: 'md:hidden' }
    ];

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

        // 화면 크기에 따라 다른 애니메이션 처리
        const isLargeScreen = window.innerWidth >= 768; // md 브레이크포인트

        // Projects와 Contact 사이 이동 확인
        const isProjectToContact =
            prevSection === 'projects' &&
            element.getAttribute('href') === '#contact';

        const isContactToProject =
            prevSection === 'contact' &&
            element.getAttribute('href') === '#projects';

        if (isLargeScreen && !(isProjectToContact || isContactToProject)) {
            // 큰 화면에서 일반적인 경우: 부드럽게 이동 (변경하지 않음)
            activeBox.current.style.transition = 'all 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
            activeBox.current.style.opacity = '1';
            activeBox.current.style.backgroundColor = isDarkMode ? 'rgba(255, 255, 255, 1)' : 'rgba(24, 24, 27, 1)';

            // 위치 변경
            activeBox.current.style.top = `${top}px`;
            activeBox.current.style.left = `${left}px`;
            activeBox.current.style.width = `${width}px`;
            activeBox.current.style.height = `${height}px`;
        } else if ((isProjectToContact || isContactToProject) && isLargeScreen) {
            // 큰 화면에서 Projects⟷Contact 전환: 기존과 동일하게 유지 (변경하지 않음)
            activeBox.current.style.opacity = '0';
            activeBox.current.style.transition = 'opacity 0.3s ease-out';

            // 먼저 위치를 변경
            activeBox.current.style.top = `${top}px`;
            activeBox.current.style.left = `${left}px`;
            activeBox.current.style.width = `${width}px`;
            activeBox.current.style.height = `${height}px`;

            // 약간의 딜레이 후에 다시 나타나게 함
            setTimeout(() => {
                activeBox.current.style.backgroundColor = isDarkMode ? 'rgba(255, 255, 255, 1)' : 'rgba(24, 24, 27, 1)';
                activeBox.current.style.opacity = '1';
            }, 250);
        } else {
            // 작은 화면에서의 네비게이션: 부드러운 전환 적용 (개선)
            activeBox.current.style.transition = 'all 0.3s ease';

            // 위치와 색상을 한 번에 변경
            activeBox.current.style.top = `${top}px`;
            activeBox.current.style.left = `${left}px`;
            activeBox.current.style.width = `${width}px`;
            activeBox.current.style.height = `${height}px`;
            activeBox.current.style.backgroundColor = isDarkMode ? 'rgba(255, 255, 255, 1)' : 'rgba(24, 24, 27, 1)';
            activeBox.current.style.opacity = '1';
        }
    };

    const handleClick = (event, link) => {
        event.preventDefault();

        // 현재 섹션 상태 저장
        const currentSection = activeSection;
        const targetSection = link.substring(1);

        // projects와 contact 간 이동 확인
        const isProjectToContact =
            currentSection === 'projects' &&
            targetSection === 'contact';

        const isContactToProject =
            currentSection === 'contact' &&
            targetSection === 'projects';

        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });

        const current = event.currentTarget;
        current.classList.add('active');

        // 이전 섹션 업데이트
        setPrevSection(currentSection);

        // 화면 크기에 따라 다른 처리 적용
        const isLargeScreen = window.innerWidth >= 768; // md 브레이크포인트

        if (isLargeScreen && !(isProjectToContact || isContactToProject)) {
            // 큰 화면에서는 즉시 업데이트 (projects⟷contact 제외) - 변경하지 않음
            updateActiveBox(current);
        } else if ((isProjectToContact || isContactToProject) && isLargeScreen) {
            // 큰 화면에서 Projects⟷Contact 전환 - 변경하지 않음
            if (activeBox.current) {
                activeBox.current.style.opacity = '0';
                activeBox.current.style.transition = 'opacity 0.3s ease-out';

                setTimeout(() => {
                    updateActiveBox(current);
                }, 150);
            } else {
                updateActiveBox(current);
            }
        } else {
            // 작은 화면에서의 네비게이션 - 개선
            updateActiveBox(current);
        }

        const target = document.querySelector(link);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            setActiveSection(targetSection);
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
            const isDarkMode = document.documentElement.classList.contains('dark');
            activeBox.current.style.backgroundColor = isDarkMode ? 'rgba(255, 255, 255, 1)' : 'rgba(24, 24, 27, 1)';
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
                // Check if we need to apply fade effect (from projects to contact)
                const currentSectionBeforeBottom = activeSection;
                const isProjectToContact = currentSectionBeforeBottom === 'projects';

                // We're near the bottom, so activate the last section (Contact)
                if (activeSection !== 'contact') {
                    setPrevSection(activeSection);
                    setActiveSection('contact');

                    document.querySelectorAll('.nav-link').forEach(link => {
                        link.classList.remove('active');
                    });

                    const contactLink = document.querySelector('.nav-link[href="#contact"]');
                    if (contactLink) {
                        contactLink.classList.add('active');

                        // Apply fade effect if coming from projects
                        if (isProjectToContact && window.innerWidth >= 768) {
                            if (activeBox.current) {
                                // 위치를 먼저 계산하고 설정
                                const parentRect = contactLink.parentElement.getBoundingClientRect();
                                const rect = contactLink.getBoundingClientRect();

                                activeBox.current.style.top = `${Math.round(rect.top - parentRect.top)}px`;
                                activeBox.current.style.left = `${Math.round(rect.left - parentRect.left)}px`;
                                activeBox.current.style.width = `${Math.round(rect.width)}px`;
                                activeBox.current.style.height = `${Math.round(rect.height)}px`;

                                // 그 다음 fade out
                                activeBox.current.style.opacity = '0';
                                activeBox.current.style.transition = 'opacity 0.3s ease-out';

                                // 잠시 후 다시 fade in
                                setTimeout(() => {
                                    const isDarkMode = document.documentElement.classList.contains('dark');
                                    activeBox.current.style.backgroundColor = isDarkMode ? 'rgba(255, 255, 255, 1)' : 'rgba(24, 24, 27, 1)';
                                    activeBox.current.style.opacity = '1';
                                }, 250);
                            } else {
                                updateActiveBox(contactLink);
                            }
                        } else {
                            updateActiveBox(contactLink);
                        }
                    }
                }
                return;
            }

            // Check if we're moving away from the bottom (Contact to Projects)
            if (activeSection === 'contact') {
                const projectsElement = document.getElementById('projects');
                if (projectsElement) {
                    const rect = projectsElement.getBoundingClientRect();
                    if (rect.top <= 150 && rect.bottom >= 150) {
                        // 현재 Contact에서 Projects로 스크롤 업 중
                        setPrevSection('contact');
                        setActiveSection('projects');

                        document.querySelectorAll('.nav-link').forEach(link => {
                            link.classList.remove('active');
                        });

                        const projectsLink = document.querySelector('.nav-link[href="#projects"]');
                        if (projectsLink && window.innerWidth >= 768) {
                            projectsLink.classList.add('active');

                            // Contact에서 Projects로 이동할 때 fade 효과 적용
                            if (activeBox.current) {
                                // 위치를 먼저 계산하고 설정
                                const parentRect = projectsLink.parentElement.getBoundingClientRect();
                                const rect = projectsLink.getBoundingClientRect();

                                activeBox.current.style.top = `${Math.round(rect.top - parentRect.top)}px`;
                                activeBox.current.style.left = `${Math.round(rect.left - parentRect.left)}px`;
                                activeBox.current.style.width = `${Math.round(rect.width)}px`;
                                activeBox.current.style.height = `${Math.round(rect.height)}px`;

                                // fade 효과 적용
                                activeBox.current.style.opacity = '0';
                                activeBox.current.style.transition = 'opacity 0.3s ease-out';

                                setTimeout(() => {
                                    const isDarkMode = document.documentElement.classList.contains('dark');
                                    activeBox.current.style.backgroundColor = isDarkMode ? 'rgba(255, 255, 255, 1)' : 'rgba(24, 24, 27, 1)';
                                    activeBox.current.style.opacity = '1';
                                }, 250);
                            } else {
                                updateActiveBox(projectsLink);
                            }
                            return;
                        }
                    }
                }
            }

            // Otherwise check each section normally
            for (const section of sections) {
                const element = document.getElementById(section);
                if (!element) continue;

                const rect = element.getBoundingClientRect();
                if (rect.top <= 150 && rect.bottom >= 150) {
                    if (activeSection !== section) {
                        // Save previous section before updating
                        const currentSectionBeforeUpdate = activeSection;
                        setPrevSection(currentSectionBeforeUpdate);
                        setActiveSection(section);

                        document.querySelectorAll('.nav-link').forEach(link => {
                            link.classList.remove('active');
                        });

                        const activeLink = document.querySelector(`.nav-link[href="#${section}"]`);
                        if (activeLink) {
                            activeLink.classList.add('active');

                            // projects와 contact 간 이동 확인
                            const isProjectToContact =
                                currentSectionBeforeUpdate === 'projects' &&
                                section === 'contact';

                            const isContactToProject =
                                currentSectionBeforeUpdate === 'contact' &&
                                section === 'projects';

                            if ((isProjectToContact || isContactToProject) && window.innerWidth >= 768) {
                                // Projects와 Contact 간 이동: fade 효과
                                if (activeBox.current) {
                                    // 위치를 먼저 계산하고 설정
                                    const parentRect = activeLink.parentElement.getBoundingClientRect();
                                    const rect = activeLink.getBoundingClientRect();

                                    activeBox.current.style.top = `${Math.round(rect.top - parentRect.top)}px`;
                                    activeBox.current.style.left = `${Math.round(rect.left - parentRect.left)}px`;
                                    activeBox.current.style.width = `${Math.round(rect.width)}px`;
                                    activeBox.current.style.height = `${Math.round(rect.height)}px`;

                                    // 그 다음 fade out
                                    activeBox.current.style.opacity = '0';
                                    activeBox.current.style.transition = 'opacity 0.3s ease-out';

                                    // 잠시 후 다시 fade in
                                    setTimeout(() => {
                                        const isDarkMode = document.documentElement.classList.contains('dark');
                                        activeBox.current.style.backgroundColor = isDarkMode ? 'rgba(255, 255, 255, 1)' : 'rgba(24, 24, 27, 1)';
                                        activeBox.current.style.opacity = '1';
                                    }, 250);
                                } else {
                                    updateActiveBox(activeLink);
                                }
                            } else {
                                // 일반적인 경우: 즉시 업데이트
                                updateActiveBox(activeLink);
                            }
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
                    // Check if this is a Projects⟷Contact transition
                    const currentSectionBeforeUpdate = activeSection;
                    const isProjectToContact =
                        currentSectionBeforeUpdate === 'projects' &&
                        closestSection === 'contact';

                    const isContactToProject =
                        currentSectionBeforeUpdate === 'contact' &&
                        closestSection === 'projects';

                    setPrevSection(currentSectionBeforeUpdate);
                    setActiveSection(closestSection);

                    document.querySelectorAll('.nav-link').forEach(link => {
                        link.classList.remove('active');
                    });

                    const activeLink = document.querySelector(`.nav-link[href="#${closestSection}"]`);
                    if (activeLink) {
                        activeLink.classList.add('active');

                        if ((isProjectToContact || isContactToProject) && window.innerWidth >= 768) {
                            // Apply fade effect
                            if (activeBox.current) {
                                // 위치를 먼저 계산하고 설정
                                const parentRect = activeLink.parentElement.getBoundingClientRect();
                                const rect = activeLink.getBoundingClientRect();

                                activeBox.current.style.top = `${Math.round(rect.top - parentRect.top)}px`;
                                activeBox.current.style.left = `${Math.round(rect.left - parentRect.left)}px`;
                                activeBox.current.style.width = `${Math.round(rect.width)}px`;
                                activeBox.current.style.height = `${Math.round(rect.height)}px`;

                                // 그 다음 fade out
                                activeBox.current.style.opacity = '0';
                                activeBox.current.style.transition = 'opacity 0.3s ease-out';

                                // 잠시 후 다시 fade in
                                setTimeout(() => {
                                    const isDarkMode = document.documentElement.classList.contains('dark');
                                    activeBox.current.style.backgroundColor = isDarkMode ? 'rgba(255, 255, 255, 1)' : 'rgba(24, 24, 27, 1)';
                                    activeBox.current.style.opacity = '1';
                                }, 250);
                            } else {
                                updateActiveBox(activeLink);
                            }
                        } else {
                            updateActiveBox(activeLink);
                        }
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
    }, [activeSection, navItems, prevSection]);

    // navOpen이 변경될 때마다 indicator 위치를 업데이트
    useEffect(() => {
        // navOpen이 true가 되었을 때만 실행
        if (navOpen) {
            // 약간의 딜레이를 주어 전환 애니메이션 이후에 실행되도록 함
            const updateIndicator = () => {
                const currentActive = document.querySelector('.nav-link.active');
                if (currentActive && activeBox.current) {
                    const isLargeScreen = window.innerWidth >= 768;

                    // 먼저 위치를 계산
                    const parentRect = currentActive.parentElement.getBoundingClientRect();
                    const rect = currentActive.getBoundingClientRect();

                    if (isLargeScreen) {
                        // 큰 화면에서는 기존 방식 유지 (변경하지 않음)
                        activeBox.current.style.opacity = '0';
                        activeBox.current.style.top = `${Math.round(rect.top - parentRect.top)}px`;
                        activeBox.current.style.left = `${Math.round(rect.left - parentRect.left)}px`;
                        activeBox.current.style.width = `${Math.round(rect.width)}px`;
                        activeBox.current.style.height = `${Math.round(rect.height)}px`;

                        // 단 한 번만 투명도 변경
                        setTimeout(() => {
                            if (activeBox.current) {
                                // 다크 모드 여부 확인
                                const isDarkMode = document.documentElement.classList.contains('dark');
                                activeBox.current.style.backgroundColor = isDarkMode ? 'rgba(255, 255, 255, 1)' : 'rgba(24, 24, 27, 1)';
                                activeBox.current.style.opacity = '1';
                            }
                        }, 350);
                    } else {
                        // 작은 화면에서는 부드러운 전환 적용 (개선)
                        const isDarkMode = document.documentElement.classList.contains('dark');

                        activeBox.current.style.transition = 'all 0.3s ease';
                        activeBox.current.style.top = `${Math.round(rect.top - parentRect.top)}px`;
                        activeBox.current.style.left = `${Math.round(rect.left - parentRect.left)}px`;
                        activeBox.current.style.width = `${Math.round(rect.width)}px`;
                        activeBox.current.style.height = `${Math.round(rect.height)}px`;
                        activeBox.current.style.backgroundColor = isDarkMode ? 'rgba(255, 255, 255, 1)' : 'rgba(24, 24, 27, 1)';
                        activeBox.current.style.opacity = '1';
                    }
                }
            };

            // 전환 애니메이션 이후에 딱 한 번만 업데이트
            setTimeout(updateIndicator, 350);
        }
    }, [navOpen]);

    // 다크 모드 변경 감지를 위한 MutationObserver 설정
    useEffect(() => {
        // 초기 테마 설정
        updateThemeColors();

        // 테마 변경 감지를 위한 MutationObserver 설정
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    updateThemeColors();
                }
            });
        });

        // <html> 요소의 클래스 변화 감지
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        });

        return () => {
            observer.disconnect();
        };
    }, []);

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
                    transition: 'all 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
                    opacity: '1',
                    zIndex: -1,
                    backgroundColor: isDarkMode
                        ? 'rgba(255, 255, 255, 1)'
                        : 'rgba(24, 24, 27, 1)'
                }}
            ></div>
        </nav>
    );
};

Navbar.propTypes = {
    navOpen: PropTypes.bool.isRequired
};

export default Navbar;
