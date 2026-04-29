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
                className="menu-btn theme-toggle-btn"
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
                <img
                    src={theme === 'dark' ? sunIcon : moonIcon}
                    alt={theme === 'dark' ? "Light mode" : "Dark mode"}
                    className={`h-5 w-5 ${theme === 'dark' ? 'brightness-0 invert' : ''}`}
                />
            </button>
        </div>
    );
};

export default ThemeToggle; 
