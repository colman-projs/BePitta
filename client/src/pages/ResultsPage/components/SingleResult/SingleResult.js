import React, { useState } from 'react';
import { Avatar, Dialog } from '@mui/material';
import SingleResultDetails from '../SingleResultDetails/SingleResultDetails';

import './SingleResult.scss';

function SingleResult(result) {
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    return (
        <>
            <Dialog
                open={showDetailsModal}
                onClose={() => setShowDetailsModal(false)}
            >
                <SingleResultDetails {...result} />
            </Dialog>
            <Avatar
                className="dish-avatar"
                onClick={() => setShowDetailsModal(true)}
                src={result.imageUrl}
                alt="dish"
                sx={{ width: 105, height: 105 }}
            />
        </>
    );
}

export default SingleResult;
