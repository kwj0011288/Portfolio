import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "motion/react";
import {
  ExpandableCard,
  ExpandableCardBody,
  ExpandableCardContent,
  ExpandableCardDescription,
  ExpandableCardExpandContainer,
  ExpandableCardImage,
  ExpandableCardTitle,
  useExpandableCardContext,
} from "./expandable-card";

function CardBadge({ status }) {
  const { uniqueId } = useExpandableCardContext();
  return (
    <motion.div layoutId={`card-badge-${uniqueId}`}>
      <StatusBadge status={status} />
    </motion.div>
  );
}

function ArrowUpRightIcon({ className = "h-4 w-4" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      className={className}
    >
      <path
        d="M5 11L11 5M6 5H11V10"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CardOverlay({ status, title }) {
  return (
    <>
      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-36 rounded-b-2xl bg-gradient-to-t from-black/65 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.1 } }}
      />
      <div className="absolute right-4 top-4">
        <CardBadge status={status} />
      </div>
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 px-4 pb-4">
        <ExpandableCardTitle className="mt-0 min-w-0 flex-1 px-0 text-left line-clamp-2 text-sm font-semibold leading-snug text-white drop-shadow md:text-base">
          {title}
        </ExpandableCardTitle>
        <motion.button
          type="button"
          className="shrink-0 inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-white opacity-0 backdrop-blur-sm transition-all duration-300 hover:bg-white/20 group-hover:opacity-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.1 } }}
        >
          View details
          <ArrowUpRightIcon className="h-3.5 w-3.5" />
        </motion.button>
      </div>
    </>
  );
}

function CardBodyContent({ imgSrc, title, status }) {
  const { isOpen } = useExpandableCardContext();
  return (
    <div className="absolute inset-0">
      <ExpandableCardImage src={imgSrc} alt={title} className="rounded-2xl" />
      <AnimatePresence>
        {!isOpen && <CardOverlay key="overlay" status={status} title={title} />}
      </AnimatePresence>
    </div>
  );
}

function StatusBadge({ status }) {
  if (status === "confidential") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/50 bg-white px-3 py-1 text-xs font-semibold tracking-wide text-amber-800 dark:border-amber-500/40 dark:bg-zinc-900 dark:text-amber-400">
        <span aria-hidden>🔒</span>
        <span>Confidential</span>
      </span>
    );
  }

  if (status === "live") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/70 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-600 dark:border-emerald-500/50 dark:bg-zinc-900 dark:text-emerald-400">
        Live
        <span
          className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500"
          aria-hidden
        />
      </span>
    );
  }

  if (status === "oss") {
    return (
      <span className="inline-flex items-center rounded-full border border-zinc-300 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-zinc-700 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-300">
        Open Source
      </span>
    );
  }

  return null;
}

const ProjectCard = ({
  imgSrc,
  title,
  role,
  tags,
  projectLink,
  githubLink,
  brief,
  description,
  classes,
  confidential = false,
  isLive = false,
}) => {
  const status = confidential ? "confidential" : isLive ? "live" : "oss";
  const [showModal, setShowModal] = useState(false);
  const [animateModal, setAnimateModal] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const animationDuration = 260;

  useEffect(() => {
    let timeoutId;

    if (showModal) {
      setIsVisible(true);
      requestAnimationFrame(() => setAnimateModal(true));
    } else {
      setAnimateModal(false);
      timeoutId = setTimeout(() => setIsVisible(false), animationDuration);
    }

    return () => clearTimeout(timeoutId);
  }, [showModal]);

  useEffect(() => {
    if (!showModal) return;

    const html = document.documentElement;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;
    const prevBodyOverscroll = document.body.style.overscrollBehavior;

    html.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "none";

    return () => {
      html.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
      document.body.style.overscrollBehavior = prevBodyOverscroll;
    };
  }, [showModal]);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleCardKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openModal();
    }
  };

  const modalBackdropStyles = {
    opacity: animateModal ? 1 : 0,
    transition: `opacity ${animationDuration}ms ease-in-out`,
  };

  const modalShellStyles = {
    opacity: animateModal ? 1 : 0,
    transform: animateModal
      ? "translateY(0) scale(1)"
      : "translateY(16px) scale(0.98)",
    transition: `transform ${animationDuration}ms cubic-bezier(0.22, 1, 0.36, 1), opacity ${animationDuration}ms ease-out`,
  };

  return (
    <>
      <div className={`${classes} hidden md:block`}>
        <ExpandableCard>
          <ExpandableCardBody className="group aspect-square cursor-pointer rounded-2xl border border-zinc-200/90 bg-zinc-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-zinc-700/80 dark:bg-zinc-900">
            <CardBodyContent imgSrc={imgSrc} title={title} status={status} />
          </ExpandableCardBody>

          <ExpandableCardExpandContainer>
            <div className="flex flex-col gap-8 p-7 sm:p-9 lg:flex-row lg:items-start">
              <div className="w-full shrink-0 aspect-square lg:w-[22rem]">
                <ExpandableCardImage
                  src={imgSrc}
                  alt={title}
                  className="rounded-2xl"
                />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <CardBadge status={status} />
                  <span className="rounded-full border border-zinc-300 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
                    {role}
                  </span>
                </div>

                <ExpandableCardTitle
                  as="h2"
                  className="px-0 mt-5 text-2xl sm:text-3xl"
                >
                  {title}
                </ExpandableCardTitle>
                <ExpandableCardDescription className="mt-4 px-0 text-sm sm:text-base leading-relaxed">
                  {brief || description || "No description available."}
                </ExpandableCardDescription>

                <ExpandableCardContent className="px-0 pb-0 pt-6 text-sm sm:text-base leading-relaxed">
                  {description || "No description available."}

                  <div className="mt-5 flex flex-wrap gap-2">
                    {tags.map((label, key) => (
                      <span
                        key={key}
                        className="rounded-full border border-zinc-300/80 bg-white px-3 py-1 text-xs font-medium text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
                      >
                        {label}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-5">
                    {githubLink && (
                      <a
                        href={githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm font-semibold text-zinc-700 transition-colors hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100"
                      >
                        GitHub
                        <ArrowUpRightIcon />
                      </a>
                    )}
                    {projectLink && (
                      <a
                        href={projectLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm font-semibold text-zinc-700 transition-colors hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100"
                      >
                        Try this
                        <ArrowUpRightIcon />
                      </a>
                    )}
                  </div>
                </ExpandableCardContent>
              </div>
            </div>
          </ExpandableCardExpandContainer>
        </ExpandableCard>
      </div>

      <article
        className={`${classes} flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-zinc-200/90 bg-zinc-100/50 shadow-sm transition-shadow hover:shadow-md dark:border-zinc-700/80 dark:bg-zinc-900/35 md:hidden`}
        onClick={openModal}
        onKeyDown={handleCardKeyDown}
        tabIndex={0}
        aria-label={`View project details: ${title}`}
      >
        <div className="h-56 w-full shrink-0 overflow-hidden">
          <img
            src={imgSrc}
            alt={title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-1 flex-col px-6 py-5">
          <div className="flex items-center justify-between gap-2">
            <StatusBadge status={status} />
          </div>

          <h3 className="mt-3 text-lg font-semibold leading-snug tracking-tight text-zinc-900 dark:text-zinc-50">
            {title}
          </h3>

          <p className="mt-2 line-clamp-2 text-sm font-medium leading-relaxed text-zinc-600 dark:text-zinc-400">
            {brief || description || "No description available."}
          </p>

          <div className="mt-auto flex flex-wrap items-center gap-4 pt-4">
            {githubLink && (
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-semibold text-zinc-700 transition-colors hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100"
                onClick={(e) => e.stopPropagation()}
              >
                GitHub
                <ArrowUpRightIcon />
              </a>
            )}
            {projectLink && (
              <a
                href={projectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-semibold text-zinc-700 transition-colors hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100"
                onClick={(e) => e.stopPropagation()}
              >
                Try this
                <ArrowUpRightIcon />
              </a>
            )}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                openModal();
              }}
              className="inline-flex items-center gap-1 text-sm font-semibold text-zinc-400 transition-colors hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300"
            >
              View details
              <ArrowUpRightIcon />
            </button>
          </div>
        </div>
      </article>

      {isVisible &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex min-h-0 items-center justify-center overflow-hidden p-3 sm:p-4"
            data-lenis-prevent
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
          >
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              style={modalBackdropStyles}
              onClick={closeModal}
              aria-hidden
            />

            <div
              className="relative z-10 w-full min-h-0 max-w-5xl"
              onClick={(e) => e.stopPropagation()}
              style={modalShellStyles}
            >
              <div className="max-h-[min(90dvh,100dvh-2rem)] overflow-y-auto rounded-2xl bg-white p-4 shadow-2xl dark:bg-zinc-900 sm:p-5">
                <div className="flex items-start justify-between gap-4 mb-5">
                  <img
                    src={imgSrc}
                    alt={title}
                    className="aspect-square w-28 shrink-0 rounded-xl object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <button
                    type="button"
                    onClick={closeModal}
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-zinc-100 text-zinc-700 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                  >
                    <span className="material-symbols-rounded">close</span>
                  </button>
                </div>

                <div className="flex flex-col gap-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <StatusBadge status={status} />
                    <span className="rounded-full border border-zinc-300 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
                      {role}
                    </span>
                  </div>

                  <h2
                    id="project-modal-title"
                    className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
                  >
                    {title}
                  </h2>

                  <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {description || brief || "No description available."}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {tags.map((label, key) => (
                      <span
                        key={key}
                        className="rounded-full border border-zinc-300/80 bg-white px-3 py-1 text-xs font-medium text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
                      >
                        {label}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-5 pt-1">
                    {githubLink && (
                      <a
                        href={githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm font-semibold text-zinc-700 transition-colors hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100"
                      >
                        GitHub
                        <ArrowUpRightIcon />
                      </a>
                    )}
                    {projectLink && (
                      <a
                        href={projectLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm font-semibold text-zinc-700 transition-colors hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100"
                      >
                        Try this
                        <ArrowUpRightIcon />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
};

ProjectCard.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  projectLink: PropTypes.string,
  githubLink: PropTypes.string,
  brief: PropTypes.string,
  description: PropTypes.string,
  classes: PropTypes.string,
  confidential: PropTypes.bool,
  isLive: PropTypes.bool,
};

export default ProjectCard;
