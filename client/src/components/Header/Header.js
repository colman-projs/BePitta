import React from 'react';
import { IconButton } from '@mui/material';
import { ArrowBack as BackIcon } from '@mui/icons-material';
import { useNavigate, useLocation, Link } from 'react-router-dom';

import Logo from '../../assets/images/Logo.png';

import './Header.scss';

function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const HOME_PATH = '/';

    return (
        <header className="header">
            {location.pathname !== HOME_PATH && (
                <IconButton onClick={() => navigate(-1)}>
                    <BackIcon />
                </IconButton>
            )}
            <Link to={HOME_PATH} className="logo">
                <img src={Logo} alt="logo" />
            </Link>
        </header>
    );
}

export default Header;
