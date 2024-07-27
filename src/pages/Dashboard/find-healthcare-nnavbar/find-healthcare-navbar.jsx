import React from 'react';
import logo from "../images/nav-logo.png";
import '../css/find-healthcare-navbar.css';

function Header() {
    return (
        <div className='find-healthcare-nav-selection'>
            <div className='find-healthcare-nav-logo'>
                <img src={logo} alt="nav-logo-img" />
            </div>
            <div className='find-healthcare-nav-logout'>
                <button>Logout</button>
            </div>
        </div>
    )
}

export default Header

