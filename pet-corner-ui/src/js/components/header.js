import React from "react";

function Logo() {
    return <img className="pet-corner-logo" src="../../logo.png" alt="Pet Corner"/>;
}

function Menu() {
    return (
        <ul>
            <li>Home</li>
            <li>Adotta</li>
            <li>Pet Sitting</li>
            <li>Terapia</li>
            <li>Addestramento</li>
        </ul>
    );
}

function Header() {
    return (
        <header>
            <div className='header'>
                <Logo />
                <Menu />
                <i className="bi bi-person-circle"></i>
            </div>
        </header>
    );
}

export default Header;