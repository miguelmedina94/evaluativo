import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';

export const Header = () => {
    // ============= HOOKS ===============
    const navigate = useNavigate();
    // ============= FUNCTIONS ============
    const goHome = () => {
        navigate('/');
    }

    // ============= RENDER  ==============
    return (
        <IconButton onClick={goHome}>
            <HomeIcon/>
        </IconButton>
    );
};