import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import './Loader.scss';

export default function CircularIndeterminate({ text }) {
    return (
        <Box sx={{ display: 'flex' }} className="loader-container center">
            <CircularProgress size="10rem" thickness={4} className="loader" />
            {text && <div className="text">{text}</div>}
        </Box>
    );
}
