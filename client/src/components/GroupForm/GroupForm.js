import { MenuItem, TextField } from '@mui/material';
import { Group as GroupIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useAlert } from 'react-alert';
import LoadingButton from '@mui/lab/LoadingButton';

import LogoWithText from '../../assets/images/LogoWithText.png';
import { restaurants } from '../../MockData/mockData';

import './GroupForm.scss';

function GroupForm() {
    const [loadingGroup, setLoadingGroup] = useState(false);
    const [restaurant, setRestaurant] = useState(null);
    const navigate = useNavigate();
    const alert = useAlert();

    const handleChangeRestaurant = e => {
        setRestaurant(e.target.value);
    };

    const handleCreateGroup = e => {
        setLoadingGroup(true);

        const groupId = 123;

        if (!groupId) alert.error('Error while creating a group');

        navigate(`/group/${groupId}`);

        setLoadingGroup(false);
    };

    return (
        <div className="group-form center">
            <img className="logo" src={LogoWithText} alt="Logo" />
            <h1>Pick A Restaurant: </h1>
            <TextField
                id="restaurant-select"
                select
                autoFocus
                label="Restaurant"
                value={restaurant}
                onChange={handleChangeRestaurant}
            >
                {restaurants.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
            <LoadingButton
                loading={loadingGroup}
                className="create-group-button"
                variant="contained"
                color="primary"
                onClick={handleCreateGroup}
                startIcon={<GroupIcon />}
                loadingPosition="end"
            >
                Create A Group
            </LoadingButton>
        </div>
    );
}

export default GroupForm;
