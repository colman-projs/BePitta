import React from 'react';
import { Back as BackIcon } from '@mui/icons-material';
import { useHistory } from 'react-router-dom';

import Logo from '../../assets/images/Logo';

import './Header.scss';

function Header() {
    const history = useHistory();

    return (
        <div className="header">
            <img src={Logo} alt="logo" />
            <IconButton onClick={history.goBack()}>
                <BackIcon />
            </IconButton>
        </div>
    );
}

export default Header;
