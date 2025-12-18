import {useState, useEffect} from 'react';
import {CgProfile} from "react-icons/cg";
import {NavLink, useNavigate} from 'react-router-dom'
import {MdClose, MdLogout, MdMenu} from "react-icons/md";
import AltHeaderDropdown from './Header/AltHeaderDropdown';
import {accessLogout, refreshLogout} from "../services/api/auth.js";
import {IoIosCreate, IoIosList} from "react-icons/io";
import {RiFileList3Line, RiHome5Line} from "react-icons/ri";
import HeaderDropdown from "./Header/HeaderDropdown.jsx";

const Header = () => {
    const [user, setUser] = useState({});
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const navigate = useNavigate();

    useEffect(() => {
        setUser({
            last_name: localStorage.getItem('last_name'),
            first_name: localStorage.getItem('first_name'),
            surname: localStorage.getItem('surname'),
            role: localStorage.getItem('role'),
        })
    }, [])

    // Блокируем скролл страницы, когда открыто меню
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMobileMenuOpen]);

    const Add = [
        {id: 1, title: 'Голосование', to: '/vote/create'},
        {id: 2, title: 'Шаблоны голосований', to: '/vote/templates'},
    ]

    const Voting = [
        {title: 'Список голосований', to: '/votes'},
        {title: 'Конструктор голосований', to: '/vote/create'}
    ]

    const logoutProfile = async () => {
        const csrf = localStorage.getItem("x-csrf-token");
        await accessLogout()
        await refreshLogout(csrf)

        localStorage.clear();
        navigate('/login');
    }

    const MobileLink = ({ to, icon, children, onClick }) => (
        <NavLink
            to={to}
            onClick={onClick}
            className={({ isActive }) =>
                `flex items-center gap-4 text-xl font-medium p-4 rounded-xl transition-all duration-300 ${
                    isActive ? 'bg-[#437DE9] text-white shadow-lg shadow-blue-500/30' : 'text-gray-300 hover:bg-[#333]'
                }`
            }
        >
            {icon}
            {children}
        </NavLink>
    );

    return (
        <div className='h-25 bg-[#212121]'>
            {/* Desktop Header */}
            <div
                className='hidden md:flex justify-between py-[18px] mx-4 2xl:mx-[240px] text-white text-md font-semibold'>
                <div className='flex gap-5 items-start'>
                    <div className='flex items-start'>
                        <img
                            className='rounded-full h-16 w-16'
                            src='https://placehold.co/64x64.png'
                            alt='User avatar'
                        />
                    </div>
                    <div className='mt-1 flex gap-5'>
                        {/*<NavLink*/}
                        {/*    to={'/'}*/}
                        {/*    className='px-5 h-13 flex items-start py-3 cursor-pointer hover:bg-[#505050] rounded-2xl'*/}
                        {/*>*/}
                        {/*    Главная*/}
                        {/*</NavLink>*/}
                        {user.role === 'CHIEF' ?
                            <div className='h-full flex items-start z-20'>
                                <HeaderDropdown
                                    title={'Голосования'}
                                    options={Voting}
                                    links={Voting.map(v => v.to)}
                                />
                            </div> :
                            <NavLink
                                to={'/votes'}
                                className='px-5 h-13 flex items-start py-3 cursor-pointer hover:bg-[#505050] rounded-2xl'
                            >
                                Голосования
                            </NavLink>

                        }




                        {/*{user.role === 'CHIEF' &&*/}
                        {/*    <div className='h-full flex items-start z-20'>*/}
                        {/*        <AltHeaderDropdown title={'Добавить'} options={Add}/>*/}
                        {/*    </div>*/}
                        {/*}*/}


                    </div>
                </div>
                <div className='flex h-15 gap-6 items-center cursor-pointer'>
                    <p className='whitespace-nowrap max-2xl:hidden'>
                        {user.last_name} {user.first_name?.slice(0, 1) + "."} {user.surname?.slice(0, 1) + "."}
                    </p>

                    <NavLink to={'/profile'}>
                        <div className="w-8 h-8 cursor-pointer">
                            <CgProfile size={32}/>
                        </div>
                    </NavLink>
                    <div className="w-8 h-8 cursor-pointer">
                        <MdLogout className='cursor-pointer' onClick={logoutProfile} size={32}/>
                    </div>
                </div>
            </div>

            {/* Mobile Header */}
            <div className='md:hidden flex justify-between items-center py-5.5 px-4 text-white'>
                <div className='flex items-center'>
                    <img
                        className='rounded-full h-14 w-14'
                        src='https://placehold.co/64x64.png'
                        alt='User avatar'
                    />
                </div>

                <div className='flex items-center gap-3'>
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className='text-white z-50 p-2 rounded-full hover:bg-white/10 transition-colors focus:outline-none'
                    >
                        {isMobileMenuOpen ? <MdClose size={32} /> : <MdMenu size={32} />}
                    </button>
                </div>
            </div>

            {/* --- Мобильный Overlay --- */}
            <div
                className={`fixed inset-0 z-40 bg-[#1a1a1a]/95 backdrop-blur-md transition-all duration-300 ease-in-out md:hidden flex flex-col pt-24 px-6
                    ${isMobileMenuOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-5 invisible pointer-events-none'}
                `}
            >
                {/* Ссылки */}
                <div className='flex flex-col gap-2'>
                    {/*<MobileLink*/}
                    {/*    to='/'*/}
                    {/*    icon={<RiHome5Line size={24}/>}*/}
                    {/*    onClick={() => setIsMobileMenuOpen(false)}*/}
                    {/*>*/}
                    {/*    Главная*/}
                    {/*</MobileLink>*/}

                    <MobileLink
                        to='/votes'
                        icon={<RiFileList3Line size={24}/>}
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Голосования
                    </MobileLink>

                    {/* развернутый список */}
                    {user.role === 'CHIEF' && (
                        <div className="mt-4 border-t border-gray-700 pt-4">
                            <p className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-2 px-4">Создание</p>
                                <MobileLink
                                    key={Voting[1].id}
                                    to={Voting[1].to}
                                    icon={Voting[1].id === 1 ? <IoIosCreate size={24}/> : <IoIosList size={24}/>}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {Voting[1].title}
                                </MobileLink>
                        </div>
                    )}
                </div>

                {/* Нижняя секция */}
                <div className='mt-auto mb-8 border-t border-gray-700 pt-6 flex flex-col gap-3'>
                    <NavLink
                        to='/profile'
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-4 text-xl font-medium text-gray-300 p-4 hover:bg-[#333] rounded-xl"
                    >
                        <CgProfile size={24} />
                        Мой профиль
                    </NavLink>

                    <button
                        onClick={logoutProfile}
                        className="flex items-center gap-4 text-xl font-medium text-red-400 p-4 hover:bg-red-400/10 rounded-xl w-full text-left"
                    >
                        <MdLogout size={24} />
                        Выйти
                    </button>
                </div>
            </div>
        </div>

    );
};

export default Header;