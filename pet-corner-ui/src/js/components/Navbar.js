import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import React from 'react';

export default function Navbar({loggedIn, setLoggedIn}) {
    return (
        <div className="navbar">
            { !loggedIn && <button className='login-button' title='Login' onClick={() => setLoggedIn(true)}><LoginIcon /></button> }
            { loggedIn &&  <button className='login-button' title='Logout' onClick={() => setLoggedIn(false)}><LogoutIcon /></button> }
            { loggedIn && <button className='login-button' title='Profilo'><PersonIcon /></button> }
        </div>
    );
}