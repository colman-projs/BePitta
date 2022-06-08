import React from 'react';
import { IconButton } from '@mui/material';
import { ArrowBack as BackIcon } from '@mui/icons-material';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import UserAvatar from '../UserAvatar/UserAvatar';
import Logo from '../../assets/images/Logo.png';

import './Header.scss';

const routesWithNoBackButton = ['results', 'waiting'];

function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const HOME_PATH = '/';

    return (
        <header className="header">
            {location.pathname !== HOME_PATH &&
                !routesWithNoBackButton.some(route =>
                    location.pathname.includes(route),
                ) && (
                    <IconButton onClick={() => navigate(-1)}>
                        <BackIcon />
                    </IconButton>
                )}
            <UserAvatar />
            <Link to={HOME_PATH} className="logo">
                <img src={Logo} alt="logo" />
            </Link>
        </header>
    );
}

export default Header;
