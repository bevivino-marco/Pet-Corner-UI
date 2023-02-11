import HomeIcon from '@mui/icons-material/Home';
import PetsIcon from '@mui/icons-material/Pets';
import SpaIcon from '@mui/icons-material/Spa';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import React from 'react';

export const navData = [
    {
        id: 0,
        icon: <HomeIcon/>,
        text: "Home",
        link: "/"
    },
    {
        id: 1,
        icon: <PetsIcon />,
        text: "Adozione",
        link: "/"
    },
    {
        id: 2,
        icon: <SpaIcon />,
        text: "Pet Therapy",
        link: "/"
    },
    {
        id: 3,
        icon: <EmojiPeopleIcon />,
        text: "Pet Sitter",
        link: "/"
    },
    {
        id: 4,
        icon: <FitnessCenterIcon />,
        text: "Training",
        link: "/"
    }  
];