import { Typography } from '@mui/material';
import Logo from '../../../../assets/images/Logo.png';
import React from 'react';

import './LoadingRecommendations.scss';

function LoadingRecommendations() {
    return (
        <div className="loading-recommendations center">
            <img className="logo" alt="BePitta" src={Logo} />
            <Typography variant="h6">Loading Recommendations</Typography>
        </div>
    );
}

export default LoadingRecommendations;
