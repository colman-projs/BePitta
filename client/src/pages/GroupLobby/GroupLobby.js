import {
    DashboardCustomize as PreferencesIcon,
    Share as ShareIcon,
} from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import LoadingButton from '@mui/lab/LoadingButton';
import QRCode from 'qrcode.react';

import { getRestaurantById } from '../../actions/restaurantActions';
import { GlobalContext } from '../../context/GlobalContext';
import { UserIdContext } from '../../context/UserIdContext';

import './GroupLobby.scss';
import { socket } from '../../socket/index';
import { getGroupById } from '../../actions/groupActions';

function GroupLobby() {
    const [loadingPreferences, setLoadingPreferences] = useState(false);
    const [restaurant, setRestaurant] = useState(null);
    const [group, setGroup] = useState(null);
    const [participants, setParticipants] = useState(0);
    const { setIsLoadingApp } = useContext(GlobalContext);
    const { userId } = useContext(UserIdContext);
    const navigate = useNavigate();
    const alert = useAlert();

    let { groupId, restaurantId } = useParams();

    useEffect(() => {
        socket.on('participants-updated', (userCount, readyCount) => {
            setParticipants(userCount);
        });

        return () => {
            socket.removeAllListeners('participants-updated');
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

        if (!restaurantId || !groupId || !userId) return;

        socket.emit('group-connect', groupId, userId);

        fetchRestaurant();
    }, [userId, groupId, restaurantId, alert, setIsLoadingApp]);

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
            <Typography variant="h6">
                Group <i className="group-name">{group?.name}</i>
            </Typography>
            <Typography variant="h6">
                Participants:
                <i className="amount">{participants}</i>
            </Typography>
            <QRCode
                id="group-qr-code"
                value={window.location.href}
                size={230}
                level={'H'}
            />
            <Button onClick={handleShareLink} endIcon={<ShareIcon />}>
                <Typography variant="h6">Invite Friends </Typography>
            </Button>
            <LoadingButton
                loading={loadingPreferences}
                variant="contained"
                color="primary"
                onClick={handleStart}
                endIcon={<PreferencesIcon />}
                loadingPosition="end"
                className="preferneces-button"
            >
                Preferences
            </LoadingButton>
        </div>
    );
}

export default GroupLobby;
