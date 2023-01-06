import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import React from 'react';

export default function Navbar({loggedIn, setLoggedIn, setContent, username}) {
    return (
        <div className="navbar">
            <div className="navbar-left" title='Visualizza il tuo profilo' onClick={() => { setContent("Profile");}}>
                { loggedIn && <p><PersonIcon />{username}</p>}
            </div>
            <div className="navbar-right">
                { !loggedIn && <button className='login-button' title='Login' onClick={() => { setContent("Login");}}><LoginIcon /></button> }
                { !loggedIn && <button className='login-button' title='Registrati' onClick={() => { setContent("Registration");}}><AppRegistrationIcon /></button> }
                { loggedIn && <button className='login-button' title='Logout' onClick={() => setLoggedIn(false)}><LogoutIcon /></button> }
            </div>          
        </div>
    );
}