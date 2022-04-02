import { MenuItem, TextField, Typography } from '@mui/material';
import { Group as GroupIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import LoadingButton from '@mui/lab/LoadingButton';

import LogoWithText from '../../assets/images/LogoWithText.png';
import { getRestaurants } from '../../actions/restaurantActions';
import { GlobalContext } from '../../context/GlobalContext';

import './GroupForm.scss';

function GroupForm() {
    const [loadingGroup, setLoadingGroup] = useState(false);
    const [restaurant, setRestaurant] = useState('');
    const [restaurants, setRestaurants] = useState([]);
    const { setIsLoadingApp } = useContext(GlobalContext);
    const navigate = useNavigate();
    const alert = useAlert();

    useEffect(() => {
        const fetchRestaurants = async () => {
            setIsLoadingApp(true);
            const res = await getRestaurants();

            if (!res) {
                alert.error('Error loading restaurants');
                return setIsLoadingApp(false);
            }

            setRestaurants(res);
            setIsLoadingApp(false);
        };

        fetchRestaurants();
    }, [alert, setIsLoadingApp]);

    const handleChangeRestaurant = e => {
        setRestaurant(e.target.value);
    };

    const handleCreateGroup = e => {
        e.preventDefault();

        setLoadingGroup(true);

        const groupId = 123;

        if (!groupId || !restaurant) {
            alert.error('Error while creating a group');
            return setLoadingGroup(false);
        }

        navigate(`/groups/${groupId}/${restaurant}`);

        setLoadingGroup(false);
    };

    return (
        <form className="group-form center" onSubmit={handleCreateGroup}>
            <img className="logo" src={LogoWithText} alt="Logo" />
            <TextField
                id="restaurant-select"
                select
                autoFocus
                value={restaurant}
                onChange={handleChangeRestaurant}
                label="Pick a Restaurant"
                disabled={loadingGroup}
                required
            >
                {restaurants.map(option => (
                    <MenuItem key={option._id} value={option._id}>
                        {option.name}
                    </MenuItem>
                ))}
            </TextField>
            <LoadingButton
                type="submit"
                loading={loadingGroup}
                className="create-group-button"
                variant="contained"
                color="primary"
                endIcon={<GroupIcon />}
                loadingPosition="end"
            >
                <Typography variant="h6">Create A Group</Typography>
            </LoadingButton>
        </form>
    );
}

export default GroupForm;
