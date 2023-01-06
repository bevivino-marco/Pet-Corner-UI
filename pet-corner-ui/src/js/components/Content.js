import React from 'react';
import Adopt from './adopt/adopt';
import Login from './Login';
import Profile from './profile/Profile';
import Registration from './Registration';

function Content({content, setContent, setLoggedIn, setUsername}) {
    const [success, setSuccess] = React.useState("");

    if(content === 'Login'){
        return <Login success={success} setSuccess={setSuccess} setContent={setContent} setLoggedIn={setLoggedIn} setUsername={setUsername} />
    }

    if(content === 'Registration'){
        return <Registration setContent={setContent} setSuccess={setSuccess} />
    }

    if(content === 'Adozione'){
        return <Adopt />
    }

    if(content === 'Profile'){
        return <Profile />
    }

    return "Not implemented yet"
}

export default Content;
