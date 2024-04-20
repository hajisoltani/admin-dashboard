import React from 'react';
import ChangeLanguages from '../../components/ChangeLanguages';
import ChangeTheme from '../../components/ChangeTheme';
import { useAppContext } from '../../context/app/AppContext';
import Logout from '../../features/identity/components/logout/Logout';


const TopNav = () => {
    const { toggleSidebar } = useAppContext()
    return (
        <nav className="navbar">
            <a className="sidebar-toggle" onClick={toggleSidebar}>
                <i className="hamburger align-self-center"></i>
            </a>
            <div className="d-flex align-items-center gap-3 ms-auto me-3">
                <ChangeLanguages />
                <ChangeTheme />

            </div>
            <div className='me-10' style={{ paddingLeft: '20px' }}>
                <Logout />
            </div>

        </nav>
    );
}

export default TopNav;
