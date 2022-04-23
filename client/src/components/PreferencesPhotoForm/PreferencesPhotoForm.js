import { Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';
// import { Carousel } from 'react-responsive-carousel';
import TinderCard from 'react-tinder-card';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import Header from '../Header';
import { getRestaurantById } from '../../actions/restaurantActions';
import { getImagesByRestaurantId } from '../../actions/imagesActions';
import { GlobalContext } from '../../context/GlobalContext';

import './PreferencesPhotoForm.scss';

export const favi = [];
function PreferencesFormPhoto() {
    const { setIsLoadingApp } = useContext(GlobalContext);
    const [restaurant, setRestaurant] = useState(null);
    const [images, setImages] = useState(null);
    const navigate = useNavigate();
    const alert = useAlert();
    let { groupId, restaurantId } = useParams();

    useEffect(() => {
        //Fetch restaurant IMAGES
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

        //Fetch restaurant details
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

    const handleFinish = e => {
        // setLoadingPreferencesPhoto(true);

        if (!groupId) {
            alert.error('Error while loading Like/Dislike page');
            // return setLoadingPreferencesPhoto(false);
        }

        window.alert('Favorite length : ' + favi.length);

        // setLoadingPreferencesPhoto(false);
    };

    const Swiped = (direction, index, id, url) => {
        if (direction === 'right') {
            favi.push({ id, url });
        }
    };

    return (
        <>
            <Header />
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
                        //loading={loadingPreferencesPhoto}
                        className="finish-button"
                        variant="contained"
                        color="primary"
                        onClick={handleFinish}
                        // loadingPosition="end"
                    >
                        <Typography variant="h7">Finish</Typography>
                    </LoadingButton>
                </div>
            </div>
        </>
    );
}

export default PreferencesFormPhoto;
