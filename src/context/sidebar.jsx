import React, { createContext, useState, useEffect, useContext } from 'react';


const SideBarContext = createContext();


const SideBarProvider = ({ children }) => {
    const [expanded, setExpanded] = useState(() => {
        const savedState = localStorage.getItem('sidebar-expanded');
        return savedState !== null ? JSON.parse(savedState) : true;
    });

    useEffect(() => {
        localStorage.setItem('sidebar-expanded', JSON.stringify(expanded));
    }, [expanded]);

    return (
        <SideBarContext.Provider value={{ expanded, setExpanded }}>
            {children}
        </SideBarContext.Provider>
    );
};


const useSideBar = () => useContext(SideBarContext);

export { SideBarProvider, useSideBar };
