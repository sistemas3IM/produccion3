import React, { createContext, useState, useContext } from 'react';
import { TiThMenu } from 'react-icons/ti';
import { AiOutlineUser } from 'react-icons/ai';
import { IoMdMore, IoIosClose } from 'react-icons/io';
import SidebarLogo from '../images/produccion.png';
import { Link, useLocation } from 'react-router-dom';
import { useSideBar } from '../context/sidebar';


const SideBarContext = createContext();

const SideBar = ({ children }) => {
    const { expanded, setExpanded } = useSideBar();

    return (
        <aside className='h-screen'>
            <nav className='h-full inline-flex flex-col bg-white shadow-sm'>
                <div className='p-4 pb-2 flex justify-between items-center'>
                    <Link to={'/'}>
                        <img src={SidebarLogo}
                            className={`overflow-hidden transition-all duration-300 ${expanded ? 'w-40' : 'w-0'}`}
                            alt="sidebar-logo" />
                    </Link>
                    <button
                        onClick={() => setExpanded(curr => !curr)}
                        className='p-1.5 rounded-lg hover:bg-gray-100'>
                        {expanded ? <IoIosClose size={25} /> : <TiThMenu size={25} />}
                    </button>
                </div>

                <SideBarContext.Provider value={{ expanded }}>
                    <ul className='flex-1'>{children}</ul>
                </SideBarContext.Provider>

                <div className='border-t flex p-3'>
                    <div className='flex relative'>
                        <AiOutlineUser size={30} className='rounded-md text-blue-950' />
                        {true && (<div className={`w-2 h-2 absolute right-0 rounded bg-green-500`}></div>)}
                    </div>
                    <div className={`
            flex justify-between items-center
            overflow-hidden transition-all duration-300 ${expanded ? 'w-52 ml-3' : 'w-0 hidden'}
          `}>
                        <div className='leading-4'>
                            <h4 className='font-semibold text-blue-950'>Usuario</h4>
                            <span className='text-xs text-blue-950'>email@im.com.sv</span>
                        </div>

                        <button>
                            <IoMdMore size={20} />
                        </button>

                    </div>
                </div>
            </nav>
        </aside>
    )
};

const SideBarItem = ({ icon, text, active, alert, linkTo }) => {
    const { expanded } = useSideBar();
    const location = useLocation();
    const isActive = location.pathname === linkTo;


    return (
        <Link to={linkTo}>
            <li className={`
        relative flex items-center py-4 px-4
        font-medium cursor-pointer
        transition-colors group
        ${isActive ? 'bg-zinc-300 text-blue-950 font-bold' : 'text-blue-950 hover:bg-zinc-200'}
        ${expanded ? '' : 'justify-center px-2'}
        `}>
                {isActive && (<div className={`w-2 h-full absolute left-0 bg-blue-700`}></div>)}
                {icon}

                <span className={`
        overflow-hidden transition-all duration-300 ${expanded ? 'w-52 ml-3' : 'w-0 hidden'}
        `}>
                    {text}
                </span>

                {!expanded && (<div className={`absolute left-full rounded-md px-2 py-1 ml-6
            bg-white text-blue-950 text-sm
            invisible opacity-20 -translate-x-3 transition-all
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
        `}>{text}</div>)}
            </li>
        </Link>
    )
};

export { SideBar, SideBarItem };