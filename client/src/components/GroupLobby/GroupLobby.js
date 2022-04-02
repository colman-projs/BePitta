import {
    DashboardCustomize as PreferencesIcon,
    Share as ShareIcon,
} from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import LoadingButton from '@mui/lab/LoadingButton';

import Header from '../Header';
import { getRestaurantById } from '../../actions/restaurantActions';
import { GlobalContext } from '../../context/GlobalContext';

import './GroupLobby.scss';

function GroupLobby() {
    const [loadingPreferences, setLoadingPreferences] = useState(false);
    const [restaurant, setRestaurant] = useState(null);
    const { setIsLoadingApp } = useContext(GlobalContext);
    const navigate = useNavigate();
    const alert = useAlert();

    let { groupId, restaurantId } = useParams();

    useEffect(() => {
        const fetchRestaurant = async () => {
            setIsLoadingApp(true);
            const res = await getRestaurantById(restaurantId);

            if (!res) {
                alert.error('Error loading restaurant details');
                return setIsLoadingApp(false);
            }

            setRestaurant(res);
            setIsLoadingApp(false);
        };

        if (!restaurantId) return;

        fetchRestaurant();
    }, [restaurantId, alert, setIsLoadingApp]);

    const handleStart = e => {
        setLoadingPreferences(true);

        const groupId = 123;

        if (!groupId) {
            alert.error('Error while loading prefernces page');
            return setLoadingPreferences(false);
        }

        navigate(`/groups/${groupId}/${restaurantId}/preferences`);

        setLoadingPreferences(false);
    };

    const handleShareLink = () => {};

    return (
        <>
            <Header />
            <div className="group-lobby center">
                <img
                    className="restaurant-logo"
                    src={restaurant?.imageurl}
                    alt="Restaurant Logo"
                />
                <Typography variant="h5">Group {groupId}</Typography>
                <Typography variant="h5">
                    Participants:
                    <i className="amount">{0}</i>
                </Typography>
                <Button onClick={handleShareLink} endIcon={<ShareIcon />}>
                    <Typography variant="h6">Invite Friends </Typography>
                </Button>
                <LoadingButton
                    loading={loadingPreferences}
                    className="create-group-button"
                    variant="contained"
                    color="primary"
                    onClick={handleStart}
                    endIcon={<PreferencesIcon />}
                    loadingPosition="end"
                >
                    <Typography variant="h6">Preferences</Typography>
                </LoadingButton>
            </div>
        </>
    );
}

export default GroupLobby;
