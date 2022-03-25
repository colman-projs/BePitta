import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { Home } from '@mui/icons-material';

import './NotFound.scss';

const NotFound = () => (
    <div className="not-found center">
        <div className="msg-1">Oops!</div>
        <div className="msg-2">
            We can't seem to find the page you're looking for.
        </div>
        <div className="msg-404">Error Code 404</div>
        <Link to="/">
            <Button startIcon={<Home />} variant="contained" color="primary">
                Homepage
            </Button>
        </Link>
    </div>
);

export default NotFound;
