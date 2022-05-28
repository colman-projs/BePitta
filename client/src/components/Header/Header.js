import React from 'react';
import { IconButton, Button } from '@mui/material';
import { ArrowBack as BackIcon, Login } from '@mui/icons-material';
import { useNavigate, useLocation, Link } from 'react-router-dom';

import Logo from '../../assets/images/Logo.png';

import './Header.scss';

function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const HOME_PATH = '/';
    const LOGIN_PATH = '/login';

    return (
        <header className="header">
            {location.pathname !== HOME_PATH && (
                <IconButton onClick={() => navigate(-1)}>
                    <BackIcon />
                </IconButton>
            )}
            <Link to={LOGIN_PATH} className="">
                <Button startIcon={<Login />} variant="contained" color="primary">
                    Login
                </Button>
            </Link>
            <Link to={HOME_PATH} className="logo">
                <img src={Logo} alt="logo" />
            </Link>
        </header>
    );
}

export default Header;
