import React from 'react';
import { Avatar, Typography } from '@mui/material';

import './SingleResultFull.scss';

function SingleResultFull({ name, description, imageUrl, percentage }) {
    return (
        <div className="single-result-full">
            <Avatar
                className="avatar"
                src={imageUrl}
                alt="dish"
                sx={{ width: 50, height: 50 }}
            />
            <Typography variant="body4">{name}</Typography>
            <Typography variant="body5">{description}</Typography>
            <Typography variant="body5">{percentage}%</Typography>
        </div>
    );
}

export default SingleResultFull;
