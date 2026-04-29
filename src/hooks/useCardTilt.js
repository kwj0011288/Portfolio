import { useMemo, useState } from "react";

const DEFAULT_TRANSFORM = "perspective(1200px) rotateX(0deg) rotateY(0deg) translate3d(0px, 0px, 0px)";

const useCardTilt = ({
    maxRotateX = 4,
    maxRotateY = 8,
    maxTranslateX = 8,
    maxTranslateY = 4,
} = {}) => {
    const [isHovering, setIsHovering] = useState(false);
    const [transform, setTransform] = useState(DEFAULT_TRANSFORM);

    const handlers = useMemo(
        () => ({
            onMouseEnter: () => {
                setIsHovering(true);
            },
            onMouseMove: (event) => {
                const rect = event.currentTarget.getBoundingClientRect();
                const offsetX = (event.clientX - rect.left) / rect.width - 0.5;
                const offsetY = (event.clientY - rect.top) / rect.height - 0.5;

                const rotateY = offsetX * maxRotateY * 2;
                const rotateX = offsetY * maxRotateX * -2;
                const translateX = offsetX * maxTranslateX * 2;
                const translateY = offsetY * maxTranslateY * 2;

                setTransform(
                    `perspective(1200px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translate3d(${translateX.toFixed(2)}px, ${translateY.toFixed(2)}px, 0px)`
                );
            },
            onMouseLeave: () => {
                setIsHovering(false);
                setTransform(DEFAULT_TRANSFORM);
            },
        }),
        [maxRotateX, maxRotateY, maxTranslateX, maxTranslateY]
    );

    const style = useMemo(
        () => ({
            transform,
            transformStyle: "preserve-3d",
            willChange: "transform",
            transition: isHovering ? "transform 120ms ease-out" : "transform 280ms ease-out",
        }),
        [isHovering, transform]
    );

    return { style, handlers };
};

export default useCardTilt;
