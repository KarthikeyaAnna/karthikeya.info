import React from 'react';
import './Header.css';

const Header = () => {
    return (
        <header className="app-header">
            <div className="logo">_Karthikeya</div>
            <nav>
                <a href="#home">Home</a>
                <a href="#about">About</a>
                <a href="#projects">Projects</a>
                <a href="#contact">Contact</a>
            </nav>
        </header>
    );
}

export default Header;
