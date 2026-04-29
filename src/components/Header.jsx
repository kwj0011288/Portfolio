import React from 'react';

import logo from '../assets/hero.png';
import Navbar from './Navbar';
import ThemeToggle from './ThemeToggle';
import resumePDF from '../assets/Wonjae Kim Resume.pdf';
import { useState, useRef } from 'react';
const Header = () => {
    const [navOpen, setNavOpen] = useState(false);
    const menuBtnRef = useRef(null);
    return (
        <header className="fixed top-0 left-0 z-40 flex h-20 w-full items-center bg-transparent">
            <div className='max-w-screen-2xl w-full mx-auto px-4 flex items-center justify-between md:px-6'>
                <div className="flex min-w-0 items-center gap-3 md:gap-6">
                    <h1 className="flex shrink-0 items-center">
                        <a href="/" className='logo'>
                            <img src={logo} width={36} height={36} alt="Wonjae Kim" />
                        </a>
                    </h1>
                    <div className="relative flex items-center self-stretch md:static md:self-auto">
                        <Navbar navOpen={navOpen} setNavOpen={setNavOpen} menuButtonRef={menuBtnRef} />
                    </div>
                </div>
                <div className="flex shrink-0 items-center justify-end">
                    <a href={resumePDF} target="_blank" rel="noreferrer" className="btn btn-secondary hidden md:inline-flex items-center gap-1">
                        Resume
                    </a>

                    <div className="hidden md:block ml-3">
                        <ThemeToggle />
                    </div>
                    <div className="flex max-md:pl-3 md:hidden">
                        <button
                            type="button"
                            ref={menuBtnRef}
                            className="menu-btn"
                            aria-expanded={navOpen}
                            aria-controls="site-nav"
                            onClick={() => setNavOpen(!navOpen)}
                        >
                            <span className="material-symbols-rounded">{navOpen ? 'close' : 'menu'}</span>
                        </button>
                    </div>
                </div>
            </div>
            <div>

            </div>
        </header>
    )
};

export default Header;