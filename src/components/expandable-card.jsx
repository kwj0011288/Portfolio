import React, {
    createContext,
    forwardRef,
    useCallback,
    useContext,
    useEffect,
    useId,
    useMemo,
    useRef,
    useState,
} from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import { XIcon } from "lucide-react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { useClickOutside } from "./hooks/useClickOutside";

function cn(...classes) {
    return classes.filter(Boolean).join(" ");
}

const ExpandableCardContext = createContext(null);

export function useExpandableCardContext() {
    const context = useContext(ExpandableCardContext);
    if (!context) {
        throw new Error("useExpandableCardContext must be used within a ExpandableCardProvider");
    }
    return context;
}

const MotionButton = motion.create("button");
const DEFAULT_TRANSITION = {
    type: "tween",
    duration: 0.32,
    ease: [0.4, 0, 0.2, 1],
};

export function ExpandableCardProvider({ children, transition }) {
    const [isOpen, setIsOpen] = useState(false);
    const uniqueId = useId();
    const triggerRef = useRef(null);

    const contextValue = useMemo(
        () => ({
            isOpen,
            uniqueId,
            triggerRef,
            setIsOpen,
        }),
        [isOpen, uniqueId]
    );

    return (
        <ExpandableCardContext.Provider value={contextValue}>
            <MotionConfig transition={transition ?? DEFAULT_TRANSITION}>{children}</MotionConfig>
        </ExpandableCardContext.Provider>
    );
}

export function ExpandableCard({ children, transition }) {
    const childArray = React.Children.toArray(children);

    return (
        <ExpandableCardProvider transition={transition}>
            <MotionConfig transition={transition ?? DEFAULT_TRANSITION}>{childArray.map((child) => child)}</MotionConfig>
        </ExpandableCardProvider>
    );
}

export const ExpandableCardBody = forwardRef(function ExpandableCardBody(
    { children, className, ...props },
    ref
) {
    const { isOpen, setIsOpen, uniqueId } = useExpandableCardContext();

    const handleClick = useCallback(() => {
        setIsOpen(true);
    }, [setIsOpen]);

    return (
        <motion.div
            ref={ref}
            data-slot="expandable-card-body"
            className={cn(
                "relative cursor-pointer select-none rounded-2xl shadow-sm",
                className
            )}
            onClick={handleClick}
            aria-haspopup="dialog"
            aria-expanded={isOpen}
            aria-controls={`expandable-card-${uniqueId}`}
            style={{}}
            {...props}
        >
            {children}
        </motion.div>
    );
});

export function ExpandableCardContent({ children, className, ...props }) {
    const { uniqueId } = useExpandableCardContext();

    return (
        <motion.div
            className={cn("overflow-hidden p-4", className)}
            aria-modal="true"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{
                ease: "easeIn",
                duration: 0.3,
                delay: 0.2,
            }}
            style={{ willChange: "transform, opacity" }}
            aria-labelledby={`expandable-card-${uniqueId}-title`}
            aria-describedby={`expandable-card-${uniqueId}-description`}
            {...props}
        >
            {children}
        </motion.div>
    );
}

export function ExpandableCardExpandContainer({ children, className }) {
    const { isOpen, uniqueId, setIsOpen } = useExpandableCardContext();
    const [mounted, setMounted] = useState(false);
    const containerRef = useRef(null);

    useClickOutside({
        ref: containerRef,
        callback: () => {
            setIsOpen(false);
        },
    });

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    useEffect(() => {
        if (!isOpen) return;

        const html = document.documentElement;
        const prevHtmlOverflow = html.style.overflow;
        const prevBodyOverflow = document.body.style.overflow;
        html.style.overflow = "hidden";
        document.body.style.overflow = "hidden";

        return () => {
            html.style.overflow = prevHtmlOverflow;
            document.body.style.overflow = prevBodyOverflow;
        };
    }, [isOpen]);

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence initial={false} mode="sync">
            {isOpen && (
                <>
                    <motion.div
                        data-slot="expandable-card-expand-container"
                        key={`expandable-backdrop-${uniqueId}`}
                        className="fixed inset-0 z-40 h-full w-full bg-white/40 dark:bg-black/40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0.1 } }}
                        transition={{ duration: 0.16 }}
                    />

                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            ref={containerRef}
                            className={cn("relative pointer-events-auto w-full max-w-[72rem]", className)}
                            initial={{ opacity: 0, y: 10, scale: 0.985 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, transition: { duration: 0.1 } }}
                            transition={DEFAULT_TRANSITION}
                            role="dialog"
                            aria-modal="true"
                            id={`expandable-card-${uniqueId}`}
                        >
                            <div className="relative overflow-hidden rounded-[2rem] bg-white text-zinc-900 shadow-2xl dark:bg-zinc-900 dark:text-zinc-50">
                                {children}
                            </div>
                            <ExpandableCardCloseButton />
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>,
        document.body
    );
}

export function ExpandableCardTitle({ className, children, ...props }) {
    const { uniqueId } = useExpandableCardContext();

    return (
        <motion.h2
            id={`expandable-card-${uniqueId}-title`}
            layoutId={`expandable-card-title-${uniqueId}`}
            className={cn("!m-0 !mt-2 px-4 text-lg font-semibold leading-6 tracking-tight", className)}
            {...props}
        >
            {children}
        </motion.h2>
    );
}

export function ExpandableCardDescription({ className, children, ...props }) {
    const { uniqueId } = useExpandableCardContext();

    return (
        <motion.h3
            id={`expandable-card-${uniqueId}-description`}
            className={cn("px-4 text-sm text-zinc-500 dark:text-zinc-400", className)}
            {...props}
        >
            {children}
        </motion.h3>
    );
}

export function ExpandableCardImage({ className, ...props }) {
    const { uniqueId } = useExpandableCardContext();

    return (
        <motion.img
            layoutId={`card-image-${uniqueId}`}
            transition={{ type: "tween", duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
            style={{ willChange: "transform" }}
            className={cn("not-prose h-full w-full object-cover object-top", className)}
            {...props}
        />
    );
}

export function ExpandableCardCloseButton({ className, children, ...props }) {
    const { setIsOpen } = useExpandableCardContext();

    const handleClose = useCallback(() => {
        setIsOpen(false);
    }, [setIsOpen]);

    return (
        <MotionButton
            onClick={handleClose}
            aria-label="Close"
            className={cn(
                "absolute right-2 top-2 z-[60] flex h-9 w-9 items-center justify-center rounded-full bg-white/70 text-zinc-700 pointer-events-auto hover:bg-white dark:bg-zinc-800/70 dark:text-zinc-300 dark:hover:bg-zinc-700",
                className
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { delay: -0.2 } }}
            transition={{ duration: 0.16, delay: 0.12 }}
            {...props}
        >
            {children ?? <XIcon size={18} />}
        </MotionButton>
    );
}

ExpandableCardProvider.propTypes = {
    children: PropTypes.node,
    transition: PropTypes.object,
};

ExpandableCard.propTypes = {
    children: PropTypes.node,
    transition: PropTypes.object,
};

ExpandableCardBody.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};

ExpandableCardContent.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};

ExpandableCardExpandContainer.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};

ExpandableCardTitle.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};

ExpandableCardDescription.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};

ExpandableCardImage.propTypes = {
    className: PropTypes.string,
    src: PropTypes.string,
    alt: PropTypes.string,
};

ExpandableCardCloseButton.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
};
