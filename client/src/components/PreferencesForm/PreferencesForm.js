import { Typography } from '@mui/material';
import React from 'react';

import Header from '../Header';

import './PreferencesForm.scss';

function GroupLobby() {
    return (
        <>
            <Header />
            <div className="preferences-form center">
                <Typography variant="h4">Preferences:</Typography>
            </div>
        </>
    );
}

export default GroupLobby;
