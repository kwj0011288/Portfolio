import React, { useContext } from 'react';
import { ThemeContext } from '../App';
import sunIcon from '../assets/sun.svg';
import moonIcon from '../assets/moon.svg';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <div className="ThemeToggle">
            <button
                onClick={toggleTheme}
                className="w-10 h-10 grid place-items-center rounded-xl
                transition duration-300 ease-in-out 
                transform active:scale-95
                bg-zinc-50/10 text-zinc-900 dark:text-zinc-100
                hover:bg-zinc-50/20 dark:hover:bg-zinc-700/40
                ring-1 ring-inset ring-zinc-50/5 dark:ring-zinc-50/5"

                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
                <img
                    src={theme === 'dark' ? sunIcon : moonIcon}
                    alt={theme === 'dark' ? "Light mode" : "Dark mode"}
                    className={`w-5 h-5 ${theme === 'dark' ? 'text-white filter brightness-0 invert' : ''}`}
                />
            </button>
        </div>
    );
};

export default ThemeToggle; 