import React from 'react';
import { Avatar } from '@mui/material';

import './SingleResult.scss';

function SingleResult({ name, description, imageUrl }) {
    return (
        <div className="single-result">
            <Avatar
                src={imageUrl}
                alt={description}
                sx={{ width: 100, height: 100 }}
            />
            {name}
        </div>
    );
}

export default SingleResult;
