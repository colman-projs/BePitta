import { Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useParams, useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import TinderCard from 'react-tinder-card';

import { getRestaurantById } from '../../actions/restaurantActions';
import { getImagesByRestaurantId } from '../../actions/imagesActions';
import { GlobalContext } from '../../context/GlobalContext';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './PreferencesPhotoForm.scss';

function PreferencesFormPhoto() {
    const { setIsLoadingApp } = useContext(GlobalContext);
    const [restaurant, setRestaurant] = useState(null);
    const [images, setImages] = useState(null);
    let { groupId, restaurantId } = useParams();
    const navigate = useNavigate();
    const alert = useAlert();

    useEffect(() => {
        // Fetch restaurant IMAGES
        const fetchRestaurantImages = async () => {
            setIsLoadingApp(true);
            const images = await getImagesByRestaurantId(restaurantId);

            if (!images) {
                alert.error('Error loading restaurant images');
                return setIsLoadingApp(false);
            }

            setImages(images);
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

        if (!restaurantId) return;

        fetchRestaurantImages();
        fetchRestaurant();
    }, [restaurantId, alert, setIsLoadingApp]);

    const handleNext = () => {
        setIsLoadingApp(true);

        if (!groupId || !restaurantId) {
            alert.error('Error while loading Results page');
            return;
        }

        // TODO: Save user dish preferences

        navigate(`/groups/${groupId}/${restaurantId}/waiting`);

        setIsLoadingApp(false);
    };

    const Swiped = (direction, index, id, url) => {
        if (direction === 'right') {
            console.log('swiped right');
        }
    };

    return (
        <div className="preferencesPhoto-form  center">
            <img
                className="restaurant-logo"
                src={restaurant?.imageurl}
                alt="Restaurant Logo"
            />
            <div>
                {images &&
                    images.map((image, index) => (
                        <TinderCard
                            className="swipe"
                            key={image.id}
                            preventSwipe={['up', 'down']}
                            onSwipe={dir =>
                                Swiped(dir, index, image.id, image.src)
                            }
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
            </div>
            <div className="footer">
                <LoadingButton
                    className="finish-button"
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                >
                    <Typography variant="h7">Finish</Typography>
                </LoadingButton>
            </div>
        </div>
    );
}

export default PreferencesFormPhoto;
