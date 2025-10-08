import React, { useState } from 'react';
import { CgProfile } from "react-icons/cg";

const HeaderLogin = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <header className="bg-[#212121] text-white shadow-lg h-[80px] sm:h-[100px]">
            <div className="container mx-auto px-4 h-full flex items-center justify-between">
                {/* Левая часть - логотип и навигация */}
                <div className="flex items-center space-x-2 sm:space-x-4">
                    {/* logo */}
                    <div className="flex">
                        <svg width="40" height="40" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 sm:w-16 sm:h-16">
                            <circle cx="32" cy="32" r="32" fill="#CCCCCC" />
                        </svg>
                    </div>

                    {/* Навигация для десктопа */}
                    <div className="hidden sm:flex items-center space-x-2">
                        <a href="#" className="py-2 px-3 text-white text-base leading-normal rounded transition-colors">
                            Главная
                        </a>
                        <a href="#" className="py-2 px-3 rounded transition-colors">
                            Голосования
                        </a>
                    </div>
                </div>

                {/* Правая часть - авторизация и профиль */}
                <div className="flex items-center space-x-2 sm:space-x-4">
                    <span className="hidden sm:inline text-sm sm:text-base">Авторизация</span>
                    <CgProfile size={32} />

                    {/* Бургер-меню для мобильных */}
                    <button
                        onClick={toggleMenu}
                        className="sm:hidden flex flex-col justify-center items-center w-8 h-8 focus:outline-none"
                        aria-label="Toggle menu"
                    >
                        <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
                        <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                        <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
                    </button>
                </div>
            </div>

            {/* Мобильное меню */}
            {isMenuOpen && (
                <div className="sm:hidden absolute top-[80px] left-0 right-0 bg-[#212121] shadow-lg z-50">
                    <div className="px-4 py-4 space-y-4">
                        <div className="flex flex-col space-y-2 pb-4 border-b border-gray-700">
                            <a
                                href="#"
                                className="py-3 px-4 text-white text-base leading-normal hover:bg-gray-700 rounded transition-colors"
                                onClick={closeMenu}
                            >
                                Главная
                            </a>
                            <a
                                href="#"
                                className="py-3 px-4 hover:bg-gray-700 rounded transition-colors"
                                onClick={closeMenu}
                            >
                                Голосования
                            </a>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                            <span className="text-base">Авторизация</span>
                            <a href="#" className="flex items-center">
                                <CgProfile size={32} />
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default HeaderLogin;