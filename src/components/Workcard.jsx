import React from "react";
import PropTypes from "prop-types";

const WorkCard = ({ experience }) => {
    const { imgSrc, label, desc, startDate, endDate, tech, position } = experience;

    return (
        <div className="flex flex-col md:flex-row items-start gap-5 group mb-12">
            {/* 왼쪽: 날짜 - 모바일에서는 카드 상단에 위치 */}
            <div className="flex md:flex-col md:items-end justify-between md:justify-start w-full md:min-w-28 md:w-auto mb-3 md:mb-0 md:pt-2">
                <div className="flex items-center md:block">
                    {/* 모바일에서만 표시되는 아이콘 */}
                    <div className="flex md:hidden mr-3">
                        <div className="w-10 h-10 rounded-lg dark:bg-zinc-800/90 light:bg-white light:shadow-sm light:ring-1 light:ring-zinc-900/10 p-1.5 z-10 flex items-center justify-center">
                            <figure className="w-full h-full overflow-hidden">
                                <img src={imgSrc} alt={label} className="w-full h-full object-contain rounded-lg" />
                            </figure>
                        </div>
                    </div>
                    <div className="dark:text-zinc-200 light:text-zinc-800 text-base font-medium">{startDate}</div>
                </div>
                <div className="dark:text-zinc-400 light:text-zinc-500 text-sm md:mt-1">{endDate}</div>
            </div>

            {/* 중간: 아이콘 - 모바일에서는 숨김 */}
            <div className="hidden md:flex flex-col items-center relative">
                <div className="w-12 h-12 rounded-lg dark:bg-zinc-800/90 light:bg-white light:shadow-sm light:ring-1 light:ring-zinc-900/10 p-1.5 z-10 flex items-center justify-center">
                    <figure className="w-full h-full overflow-hidden">
                        <img src={imgSrc} alt={label} className="w-full h-full object-contain rounded-lg" />
                    </figure>
                </div>
            </div>

            {/* 오른쪽: 카드 컨텐츠 */}
            <div className="flex-1 w-full">
                <div className="
          rounded-2xl p-4 md:p-6 transition-all 
          bg-white dark:bg-zinc-800/70
          ring-1 ring-zinc-200 dark:ring-zinc-50/10
          hover:ring-zinc-300 dark:hover:ring-zinc-50/20
          hover:bg-zinc-50 dark:hover:bg-zinc-800
        ">
                    <h3 className="text-xl md:text-2xl font-medium text-zinc-800 dark:text-zinc-50">{label}</h3>
                    {position && (
                        <div className="text-sm md:text-base mt-1 text-zinc-600 dark:text-zinc-300">{position}</div>
                    )}
                    <div className="mt-4 md:mt-5 space-y-2.5 md:space-y-3.5">
                        {desc.map((item, index) => (
                            <p key={index} className="text-[14px] md:text-[15px] leading-relaxed flex items-start gap-2 md:gap-3 text-zinc-700 dark:text-zinc-200">
                                <span className="text-[6px] mt-[8px] text-zinc-400">●</span>
                                <span>{item}</span>
                            </p>
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-1.5 md:gap-2 mt-4 md:mt-6">
                        {tech.map((item, index) => (
                            <span key={index} className="text-xs md:text-sm px-2 md:px-3 py-1 rounded-md bg-zinc-100 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-200">
                                {item}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

WorkCard.propTypes = {
    experience: PropTypes.shape({
        imgSrc: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        desc: PropTypes.array.isRequired,
        tech: PropTypes.array.isRequired,
        startDate: PropTypes.string.isRequired,
        endDate: PropTypes.string.isRequired,
        position: PropTypes.string
    }).isRequired
};

export default WorkCard;
