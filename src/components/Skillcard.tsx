import React from "react";
import PropTypes from "prop-types";

const SkillCard = ({ imgSrc, label, desc, className }) => {
  return (
    <div
      className={`flex items-center gap-3 rounded-2xl p-3 transition-all 
      bg-white dark:bg-zinc-800
      ring-1 ring-zinc-200 dark:ring-zinc-50/10
      hover:bg-zinc-50 dark:hover:bg-zinc-700/50
      hover:ring-zinc-300 dark:hover:ring-zinc-50/20
      ${className}`}
    >
      <figure
        className={`bg-white dark:bg-zinc-700/50 rounded-lg overflow-hidden w-12 h-12 p-2 
        transition-colors`}
      >
        <img src={imgSrc} alt={label} width={30} height={30} />
      </figure>
      <div>
        <h3 className="text-zinc-800 dark:text-zinc-50">{label}</h3>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm">{desc}</p>
      </div>
    </div>
  );
};

SkillCard.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default SkillCard;
