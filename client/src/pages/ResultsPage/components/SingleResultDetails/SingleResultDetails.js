import { Typography } from '@mui/material';
import React from 'react';

import './SingleResultDetails.scss';

function SingleResultDetails({ name, description, imageUrl, percentage }) {
    return (
        <div className="single-result-details">
            <Typography variant="h4" className="percentage">
                {percentage}% Match!
            </Typography>
            <Typography variant="h4">{name}</Typography>
            <Typography variant="h6">{description}</Typography>
            <img className="dish-img" src={imageUrl} alt="dish" />
        </div>
    );
}

export default SingleResultDetails;
