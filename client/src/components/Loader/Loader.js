import React from 'react';
import { Typography, Box, CircularProgress } from '@mui/material';

import './Loader.scss';

export default function CircularIndeterminate({ text }) {
    return (
        <Box
            sx={{ display: 'flex', zIndex: '10' }}
            className="loader-container center"
        >
            <CircularProgress size="10rem" thickness={4} className="loader" />
            {text && <Typography className="text">{text}</Typography>}
        </Box>
    );
}
