import React from 'react';
import Adopt from './adopt/adopt';

function Content({content}) {
    if(content === 'Adozione'){
        return <Adopt />
    }

    return "Not implemented yet"
}

export default Content;
