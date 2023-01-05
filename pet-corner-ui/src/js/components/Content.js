import React from 'react';
import Adopt from './adopt/adopt';
import Login from './Login';
import Registration from './Registration';

function Content({content}) {
    if(content === 'Login'){
        return <Login />
    }

    if(content === 'Registration'){
        return <Registration />
    }

    if(content === 'Adozione'){
        return <Adopt />
    }

    return "Not implemented yet"
}

export default Content;
