import React from 'react';

import logo from '../assets/hero.png';
import Navbar from './Navbar';
import ThemeToggle from './ThemeToggle';
import { useState } from 'react';
const Header = () => {
    const [navOpen, setNavOpen] = useState(false);
    return (
        <header className='fixed top-0 left-0 w-full h-20 flex items-center z-40 
                          bg-gradient-to-b from-zinc-900 to-zinc-900'>
            <div className='max-w-screen-2xl w-full mx-auto px-4 flex justify-between items-center md:px-6 md:grid md:grid-cols-[1fr,3fr,1fr]'>
                <h1 className="flex items-center">
                    <a href="/" className='logo'>
                        <img src={logo} width={40} height={40} alt="Wonjae Kim" />
                    </a>
                </h1>
                <div className='md:block md:justify-self-center'>
                    <Navbar navOpen={navOpen} />
                </div>
                <div className="flex items-center justify-end">
                    <a href="#contact" className="btn btn-secondary hidden max-lg:hidden ">
                        Contact Me
                    </a>

                    <div className="hidden md:block ml-3">
                        <ThemeToggle />
                    </div>
                    <div className="flex items-center md:hidden">
                        <div className="mr-3">
                            <ThemeToggle />
                        </div>
                        <button className='menu-btn' onClick={() => setNavOpen(!navOpen)}>
                            <span className='material-symbols-rounded'>{navOpen ? 'close' : 'menu'}</span>
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