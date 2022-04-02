import React from 'react';
import { IconButton } from '@mui/material';
import { ArrowBack as BackIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import Logo from '../../assets/images/Logo.png';

import './Header.scss';

function Header() {
    const navigate = useNavigate();

    return (
        <header className="header">
            <IconButton onClick={() => navigate(-1)}>
                <BackIcon />
            </IconButton>
            <img className="logo" src={Logo} alt="logo" />
        </header>
    );
}

export default Header;
