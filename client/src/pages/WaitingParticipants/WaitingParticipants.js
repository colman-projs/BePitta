import { Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useParams, useNavigate } from 'react-router-dom';
import { getRestaurantById } from '../../actions/restaurantActions';
import { GlobalContext } from '../../context/GlobalContext';
import { UserIdContext } from '../../context/UserIdContext';
import { socket } from '../../socket/index';

import './WaitingParticipants.scss';

function WaitingParticipants() {
    const { setIsLoadingApp } = useContext(GlobalContext);
    const { userId } = useContext(UserIdContext);
    const [restaurant, setRestaurant] = useState(null);
    const [participants, setParticipants] = useState(1);
    const [readyParticipants, setReadyParticipants] = useState(0);
    let { groupId, restaurantId } = useParams();
    const navigate = useNavigate();
    const alert = useAlert();

    useEffect(() => {
        socket.on('participants-updated', (userCount, readyCount) => {
            setParticipants(userCount);
            setReadyParticipants(readyCount);
        });

        return () => {
            socket.removeAllListeners('participants-updated');
            socket.removeAllListeners('reasults-ready');
        };
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

        if (!restaurantId || !groupId || !userId) return;

        socket.emit('user-waiting', groupId, userId);

        fetchRestaurant();
    }, [restaurantId, alert, setIsLoadingApp, groupId, userId]);

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

        if (!groupId || !restaurantId) return;

        socket.removeAllListeners('reasults-ready');
        socket.on('reasults-ready', () => {
            // Load results
            handleAllParticipantsReady();
        });
    }, [groupId, restaurantId, alert, navigate, setIsLoadingApp]);

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
            {participants !== readyParticipants ? (
                <Typography variant="h6">
                    Waiting for other participants:
                    <Typography variant="h5" className="participants">
                        <span className="ready-participants">
                            {readyParticipants}
                        </span>
                        /{participants}
                    </Typography>
                </Typography>
            ) : (
                <Typography variant="h5" className="participants">
                    Calulating Results...
                </Typography>
            )}
            {participants !== readyParticipants && (
                <Typography variant="h6">
                    We'll pick the best dishes for you when everyone is ready!
                </Typography>
            )}
        </div>
    );
}

export default WaitingParticipants;
