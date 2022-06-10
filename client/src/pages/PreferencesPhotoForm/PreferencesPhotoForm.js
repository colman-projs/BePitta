import { Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useParams, useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import TinderCard from 'react-tinder-card';

import { getRestaurantById } from '../../actions/restaurantActions';
import { getRestaurantDishes } from '../../actions/restaurantActions';
import { GlobalContext } from '../../context/GlobalContext';
import { socket } from '../../socket/index';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './PreferencesPhotoForm.scss';
import { UserIdContext } from '../../context/UserIdContext';
import { getUserById, updateUserDishes } from '../../actions/userActions';

function PreferencesFormPhoto() {
    const { setIsLoadingApp } = useContext(GlobalContext);
    const { userId } = useContext(UserIdContext);
    const [restaurant, setRestaurant] = useState(null);
    const [dishes, setDishes] = useState(null);
    let { groupId, restaurantId } = useParams();
    const navigate = useNavigate();
    const alert = useAlert();
    let likedDishes = [];

    useEffect(() => {
        // Fetch restaurant IMAGES
        const fetchRestaurantImages = async () => {
            setIsLoadingApp(true);
            const dishes = await getRestaurantDishes(restaurantId);
            if (!dishes) {
                alert.error('Error loading restaurant dishes');
                return setIsLoadingApp(false);
            }

            setDishes(dishes);
            setIsLoadingApp(false);
        };

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

        socket.emit('group-connect', groupId, userId);

        fetchRestaurantImages();
        fetchRestaurant();
    }, [groupId, restaurantId, alert, setIsLoadingApp, userId]);

    const handleNext = async e => {
        setIsLoadingApp(true);

        if (!groupId || !restaurantId) {
            alert.error('Error while loading Results page');
            return;
        }

        console.log('Dishes to save: ', likedDishes);

        const success = await updateUserDishes(userId, likedDishes);

        if (!success) {
            alert.error('Error while updating liked dishes');
        } else {
            navigate(`/groups/${groupId}/${restaurantId}/waiting`);
        }
        setIsLoadingApp(false);
    };

    const Swiped = (direction, index, id, url) => {
        if (direction === 'right') {
            likedDishes.push({ _id: id });
        }
    };

    return (
        <div className="preferences-photo-form">
            <img
                className="restaurant-logo"
                src={restaurant?.imageurl}
                alt="Restaurant Logo"
            />
            {dishes &&
                dishes.map((image, index) => (
                    <TinderCard
                        className="swipe center"
                        key={image.id}
                        preventSwipe={['up', 'down']}
                        onSwipe={dir => Swiped(dir, index, image.id, image.src)}
                    >
                        <div
                            style={{
                                backgroundImage: `url(${image.src})`,
                            }}
                            className="card"
                        >
                            <h4 className="ImageName">{image?.name}</h4>
                        </div>
                    </TinderCard>
                ))}
            <LoadingButton
                className="finish-button"
                variant="contained"
                color="primary"
                onClick={handleNext}
            >
                <Typography variant="h7">I'm Done</Typography>
            </LoadingButton>
        </div>
    );
}

export default PreferencesFormPhoto;
