import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import React from 'react';

export default function Navbar({loggedIn, setLoggedIn, setContent}) {
    return (
        <div className="navbar">
            { !loggedIn && <button className='login-button' title='Login' onClick={() => { setLoggedIn(true); setContent("Login");}}><LoginIcon /></button> }
            { !loggedIn && <button className='login-button' title='Registrati' onClick={() => { setContent("Registration");}}><AppRegistrationIcon /></button> }
            { loggedIn && <button className='login-button' title='Logout' onClick={() => setLoggedIn(false)}><LogoutIcon /></button> }
            { loggedIn && <button className='login-button' title='Profilo'><PersonIcon /></button> }
        </div>
    );
}