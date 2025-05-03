import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// 반응형 훅: 모바일 여부 판단
const useMobile = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return isMobile;
};

const ProjectCard = ({
    imgSrc,
    title,
    tags,
    projectLink,
    githubLink,
    description,
    classes,
}) => {
    const isMobile = useMobile();
    const [showModal, setShowModal] = useState(false);
    const [animateModal, setAnimateModal] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const animationDuration = 300;

    useEffect(() => {
        let timeoutId;
        if (showModal && !isMobile) {
            setIsVisible(true);
            requestAnimationFrame(() => setAnimateModal(true));
            document.body.style.overflow = "hidden";
        } else {
            setAnimateModal(false);
            document.body.style.overflow = "visible";
            timeoutId = setTimeout(() => setIsVisible(false), animationDuration);
        }
        return () => {
            clearTimeout(timeoutId);
            document.body.style.overflow = "visible";
        };
    }, [showModal, isMobile]);

    const handleCardClick = (e) => {
        if (!isMobile) {
            e.preventDefault();
            setShowModal(true);
        }
    };

    const closeModal = () => setShowModal(false);

    const modalBackdropStyles = {
        opacity: animateModal ? 1 : 0,
        transition: `opacity ${animationDuration}ms ease-in-out`,
    };

    const modalContentStyles = {
        opacity: animateModal ? 1 : 0,
        transform: animateModal
            ? "translate(-50%, -50%) scale(1)"
            : "translate(-50%, -50%) scale(0.95)",
        transition: `transform ${animationDuration}ms ease-out, opacity ${animationDuration}ms ease-out`,
    };

    return (
        <>
            <div
                className={`relative p-4 rounded-2xl transition-colors h-full flex flex-col ${classes}
          dark:bg-zinc-800 dark:hover:bg-zinc-700/50 dark:active:bg-zinc-700/60 dark:ring-1 dark:ring-inset dark:ring-zinc-50/5
          light:bg-white light:hover:bg-gray-50 light:active:bg-gray-100 light:ring-1 light:ring-inset light:ring-zinc-900/20 light:shadow-lg`}
                onClick={handleCardClick}
            >
                {isMobile ? (
                    <div className="flex gap-4 items-start">
                        <img
                            src={imgSrc}
                            alt={title}
                            className="w-24 h-24 rounded-md object-cover"
                        />
                        <div className="flex flex-col flex-1 gap-2">
                            <h3 className="font-semibold text-base dark:text-zinc-100 light:text-zinc-800">
                                {title}
                            </h3>
                            <div className="flex flex-wrap gap-1">
                                {tags.map((label, key) => (
                                    <span
                                        key={key}
                                        className="text-xs px-2 py-1 rounded bg-zinc-200 dark:bg-zinc-700 dark:text-zinc-200"
                                    >
                                        {label}
                                    </span>
                                ))}
                            </div>
                            <p className="text-sm text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap">
                                {description || "No description available."}
                            </p>

                        </div>
                    </div>
                ) : (
                    <>
                        <figure className="aspect-square rounded-lg mb-4 overflow-hidden relative dark:bg-zinc-700 light:bg-gray-200">
                            <img
                                src={imgSrc}
                                alt={title}
                                loading="lazy"
                                width={300}
                                height={300}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-3 right-3 flex gap-2">
                                {githubLink && (
                                    <a
                                        href={githubLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-lg grid place-items-center transition-transform hover:translate-y-[-5px] z-10 mt-2
                    dark:bg-zinc-800/90 dark:text-zinc-100 
                    light:bg-white light:text-zinc-800 light:shadow-md light:ring-1 light:ring-inset light:ring-zinc-900/10"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        {/* GitHub Icon */}
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="22"
                                            height="22"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                        >
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                        </svg>
                                    </a>
                                )}
                                {projectLink && (
                                    <a
                                        href={projectLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-lg grid place-items-center transition-transform hover:translate-y-[-5px] z-10 mt-2
                    dark:bg-zinc-800/90 dark:text-zinc-100
                    light:bg-white light:text-zinc-800 light:shadow-md light:ring-1 light:ring-inset light:ring-zinc-900/10"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <span className="material-symbols-rounded">arrow_outward</span>
                                    </a>
                                )}
                            </div>
                        </figure>

                        <div className="flex flex-col w-full flex-grow">
                            <h3 className="title-1 font-semibold text-lg dark:text-zinc-100 light:text-zinc-800">
                                {title}
                            </h3>
                            <div className="flex flex-wrap items-center gap-2 mt-3 mb-4">
                                {tags.map((label, key) => (
                                    <span
                                        key={key}
                                        className="text-sm px-3 py-1 rounded-md bg-zinc-100 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-200 ring-1 ring-inset ring-zinc-300/30 dark:ring-zinc-50/10"
                                    >
                                        {label}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="absolute right-4 bottom-2 text-xs flex items-center gap-1 opacity-70 hover:opacity-100 transition-opacity dark:text-zinc-400 light:text-zinc-600 md:flex hidden mt-4">
                            <span className="material-symbols-rounded text-sm">info</span>
                            Click for details
                        </div>
                    </>
                )}
            </div>

            {!isMobile && isVisible && (
                <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={closeModal}>
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" style={modalBackdropStyles} />
                    <div
                        className="fixed top-1/2 left-1/2 rounded-2xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto flex flex-col gap-6 z-10 shadow-xl dark:bg-zinc-800 light:bg-white"
                        onClick={(e) => e.stopPropagation()}
                        style={modalContentStyles}
                    >
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold dark:text-zinc-100 light:text-zinc-800">{title}</h2>
                            <button
                                onClick={closeModal}
                                className="w-10 h-10 rounded-full grid place-items-center dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:text-zinc-300 light:bg-gray-100 light:hover:bg-gray-200 light:text-zinc-700"
                            >
                                <span className="material-symbols-rounded">close</span>
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex items-center justify-center rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-700 p-3">
                                <img src={imgSrc} alt={title} className="max-h-[300px] w-auto object-contain rounded-xl" />
                            </div>
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-wrap items-center gap-2">
                                    {tags.map((label, key) => (
                                        <span
                                            key={key}
                                            className="text-sm px-3 py-1 rounded-md bg-zinc-100 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-200 ring-1 ring-inset ring-zinc-300/30 dark:ring-zinc-50/10"
                                        >
                                            {label}
                                        </span>
                                    ))}
                                </div>
                                <div className="leading-relaxed dark:text-zinc-300 light:text-zinc-700">
                                    {description || "프로젝트에 대한 상세 설명이 없습니다."}
                                </div>
                                <div className="flex gap-3 mt-auto pt-4">
                                    {githubLink && (
                                        <a
                                            href={githubLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:text-zinc-100 light:bg-gray-100 light:hover:bg-gray-200 light:text-zinc-800 light:ring-1 light:ring-gray-300/30"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="18"
                                                height="18"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                            >
                                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                            </svg>
                                            GitHub
                                        </a>
                                    )}
                                    {projectLink && (
                                        <a
                                            href={projectLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:text-zinc-100 light:bg-gray-100 light:hover:bg-gray-200 light:text-zinc-800 light:ring-1 light:ring-gray-300/30"
                                        >
                                            <span className="material-symbols-rounded">language</span>
                                            View Project
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

ProjectCard.propTypes = {
    imgSrc: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    tags: PropTypes.array.isRequired,
    projectLink: PropTypes.string.isRequired,
    githubLink: PropTypes.string,
    description: PropTypes.string,
    classes: PropTypes.string,
};

export default ProjectCard;
