import { Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useParams, useNavigate } from 'react-router-dom';
import { getRestaurantById } from '../../actions/restaurantActions';
import { GlobalContext } from '../../context/GlobalContext';

import './WaitingParticipants.scss';

function WaitingParticipants() {
    const { setIsLoadingApp } = useContext(GlobalContext);
    const [restaurant, setRestaurant] = useState(null);
    const [participants, setParticipants] = useState([]);
    let { groupId, restaurantId } = useParams();
    const navigate = useNavigate();
    const alert = useAlert();

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

        // If not all participants are ready
        // TODO: Get participants
        if (true) return;

        // Load results
        handleAllParticipantsReady();
    }, [participants, groupId, restaurantId, alert, navigate, setIsLoadingApp]);

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
            <Typography variant="h7">
                Waiting for other participants:
                <span className="ready-participants"> 1</span>/5
            </Typography>
            <Typography variant="h5">
                We'll pick the best dishes for you when everyone is ready!
            </Typography>
        </div>
    );
}

export default WaitingParticipants;
