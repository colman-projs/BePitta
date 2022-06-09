import {
    DashboardCustomize as PreferencesIcon,
    Share as ShareIcon,
} from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import LoadingButton from '@mui/lab/LoadingButton';

import { getRestaurantById } from '../../actions/restaurantActions';
import { GlobalContext } from '../../context/GlobalContext';

import './GroupLobby.scss';
import { socket } from '../../socket/index';
import { getGroupById } from '../../actions/groupActions';
import { cookie } from '../../actions/cookieActions';

function GroupLobby() {
    const [loadingPreferences, setLoadingPreferences] = useState(false);
    const [restaurant, setRestaurant] = useState(null);
    const [group, setGroup] = useState(null);
    const [participants, setParticipants] = useState(0);
    const { setIsLoadingApp } = useContext(GlobalContext);
    const navigate = useNavigate();
    const alert = useAlert();

    let { groupId, restaurantId } = useParams();

    useEffect(() => {
        socket.on('participants-updated', userCount => {
            setParticipants(userCount);
        });

        return () => {

        };
    }, []);

    useEffect(() => {
        const fetchRestaurant = async () => {
            setIsLoadingApp(true);
            const res = await getRestaurantById(restaurantId);
            const grp = await getGroupById(groupId);

            if (!res) {
                alert.error('Error loading restaurant details');
                return setIsLoadingApp(false);
            }

            if (!grp) {
                alert.error('Error loading group details');
                return setIsLoadingApp(false);
            }

            setParticipants(1);
            setRestaurant(res);
            setGroup(grp);
            setIsLoadingApp(false);
        };

        if (!restaurantId || !groupId) return;

        const userId = cookie.getCookie(cookie.siteCookies.userId);
        socket.emit('group-connect', groupId, userId);

        fetchRestaurant();
    }, [groupId, restaurantId, alert, setIsLoadingApp]);

    const handleStart = e => {
        setLoadingPreferences(true);

        // const groupId = 123;

        if (!groupId) {
            alert.error('Error while loading prefernces page');
            return setLoadingPreferences(false);
        }

        navigate(`/groups/${groupId}/${restaurantId}/preferences`);

        setLoadingPreferences(false);
    };

    const handleShareLink = () => {
        if (navigator.share) {
            navigator.share({
                title: 'BePitta',
                text: 'You are invited to BePitta App :)',
                url: window.location,
            });
        }
    };

    return (
        <div className="group-lobby center">
            <img
                className="restaurant-logo"
                src={restaurant?.imageurl}
                alt="Restaurant Logo"
            />
            <Typography variant="h5">Group {group?.name}</Typography>
            <Typography variant="h5">
                Participants:
                <i className="amount">{participants}</i>
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
    );
}

export default GroupLobby;
