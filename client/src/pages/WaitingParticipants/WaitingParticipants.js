import { Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useParams, useNavigate } from 'react-router-dom';
import { getRestaurantById } from '../../actions/restaurantActions';
import { GlobalContext } from '../../context/GlobalContext';
import { socket } from '../../socket';

import './WaitingParticipants.scss';

function WaitingParticipants() {
    const { setIsLoadingApp } = useContext(GlobalContext);
    const [restaurant, setRestaurant] = useState(null);
    const [participants, setParticipants] = useState([1, 2, 3, 4]);
    const [readyParticipants, setReadyParticipants] = useState([1, 2]);
    let { groupId, restaurantId } = useParams();
    const navigate = useNavigate();
    const alert = useAlert();

    useEffect(() => {
        // TODO: Update ready participants

        // TODO: Update total participants
        socket.on('participants-updated', userCount => {
            setParticipants(userCount);
        });
    }, []);

    useEffect(() => {
        // Fetch restaurant details
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

    useEffect(() => {
        const handleAllParticipantsReady = () => {
            setIsLoadingApp(true);

            if (!groupId || !restaurantId) {
                alert.error('Error while loading Results page');
                return;
            }

            navigate(`/groups/${groupId}/${restaurantId}/results`);

            setIsLoadingApp(false);
        };

        // TODO: Check if total participants equal to ready participants
        // If not all participants are ready
        if (participants.length !== readyParticipants.length) return;

        // Load results
        handleAllParticipantsReady();
    }, [
        participants,
        readyParticipants,
        groupId,
        restaurantId,
        alert,
        navigate,
        setIsLoadingApp,
    ]);

    return (
        <div className="waiting center">
            <img
                className="restaurant-logo"
                src={restaurant?.imageurl}
                alt="Restaurant Logo"
            />
            <Typography variant="h5">
                We have locked in your preferences!
            </Typography>
            <Typography variant="h6">
                Waiting for other participants:
                <Typography variant="h5" className="participants">
                    <span className="ready-participants">
                        {readyParticipants.length}
                    </span>
                    /{participants.length}
                </Typography>
            </Typography>
            <Typography variant="h6">
                We'll pick the best dishes for you when everyone is ready!
            </Typography>
        </div>
    );
}

export default WaitingParticipants;
