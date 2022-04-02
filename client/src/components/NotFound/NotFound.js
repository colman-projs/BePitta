import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import { Home } from '@mui/icons-material';

import './NotFound.scss';

const NotFound = () => (
    <div className="not-found center">
        <Typography className="msg-1">Oops!</Typography>
        <Typography className="msg-2">
            We can't seem to find the page you're looking for.
        </Typography>
        <Typography className="msg-404">Error Code 404</Typography>
        <Link to="/">
            <Button startIcon={<Home />} variant="contained" color="primary">
                Homepage
            </Button>
        </Link>
    </div>
);

export default NotFound;
