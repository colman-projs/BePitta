import React, { useContext, useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router';
import { useAlert } from 'react-alert';
import { Button, Typography } from '@mui/material';
import {
    Share as ShareIcon,
    FormatListNumbered as FormatListNumberedIcon,
    Star as StarIcon,
} from '@mui/icons-material';
import html2canvas from 'html2canvas';
import ResultsList from '../ResultsList/ResultsList';
import { getDishesByIds } from '../../../../actions/dishesActions';
import { GlobalContext } from '../../../../context/GlobalContext';
import FullResultsList from '../FullResultsList/FullResultsList';
import { getRestaurantById } from '../../../../actions/restaurantActions';
import { getRecommendations } from '../../../../actions/recommenderActions';
import LoadingRecommendations from '../LoadingRecommendations/LoadingRecommendations';

import './ResultsPage.scss';

function ResultsPage() {
    const [dishes, setDishes] = useState([]);
    const [results, setResults] = useState([]);
    const [restaurant, setRestaurant] = useState(null);
    const [toggleFullResults, setToggleFullResults] = useState(false);
    const [loadingRecommendations, setLoadingRecommendations] = useState(false);
    let { restaurantId, groupId } = useParams();
    const { setIsLoadingApp, isLoadingApp } = useContext(GlobalContext);
    const alert = useAlert();

    useEffect(() => {
        const fetchRecommendations = async () => {
            setLoadingRecommendations(true);

            const dishesRecommendations = await getRecommendations(groupId);

            if (!dishesRecommendations?.dishes) {
                alert.error('Error loading recommendations');
                return setIsLoadingApp(false);
            }

            setDishes(dishesRecommendations.dishes);

            setLoadingRecommendations(false);
        };

        if (!groupId) return;

        fetchRecommendations();
    }, [groupId, alert, setIsLoadingApp]);

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
        const fetchDishesByIds = async () => {
            setIsLoadingApp(true);
            let dishesRes = await getDishesByIds(dishes.map(dish => dish.id));

            if (!dishesRes) {
                alert.error('Error results');
                return setIsLoadingApp(false);
            }

            dishesRes.forEach(dishRes => {
                const currDish = dishes.find(dish => dish.id === dishRes._id);

                if (!currDish) return;

                dishRes.percentage = currDish.match * 100;
            });

            setResults(dishesRes);
            setIsLoadingApp(false);
        };

        if (!dishes.length) return;

        fetchDishesByIds();
    }, [setIsLoadingApp, alert, dishes]);

    const handleShareResults = async () => {
        if (!('share' in navigator)) {
            return;
        }
        // `element` is the HTML element you want to share.
        // `backgroundColor` is the desired background color.
        const canvas = await html2canvas(document.body, {
            backgroundColor: '#033047',
        });
        canvas.toBlob(async blob => {
            // Even if you want to share just one file you need to
            // send them as an array of files.
            const files = [new File([blob], 'image.png', { type: blob.type })];
            const shareData = {
                title: 'BePitta',
                text: 'My top 3 picks :)',
                files,
            };
            if (navigator.canShare(shareData)) {
                try {
                    await navigator.share(shareData);
                } catch (err) {
                    if (err.name !== 'AbortError') {
                        console.error(err.name, err.message);
                    }
                }
            } else {
                console.warn('Sharing not supported', shareData);
            }
        });
    };

    const renderRecommendations = () => {
        if (!results.length && !isLoadingApp)
            return (
                <>
                    <img
                        className="restaurant-logo"
                        src={restaurant?.imageurl}
                        alt="Restaurant Logo"
                    />
                    <Typography variant="h6">
                        We couldn't pick any recommendations for you
                    </Typography>
                </>
            );

        return (
            <>
                <img
                    className="restaurant-logo"
                    src={restaurant?.imageurl}
                    alt="Restaurant Logo"
                />
                <div className="results-content">
                    {toggleFullResults ? (
                        <FullResultsList results={results} />
                    ) : (
                        <>
                            <Typography className="title" variant="h5">
                                Top Picks For You:
                            </Typography>
                            <ResultsList results={results} />
                            <div className="half-circle" />
                        </>
                    )}
                </div>
                <Button
                    onClick={() =>
                        setToggleFullResults(prevState => !prevState)
                    }
                    startIcon={
                        toggleFullResults ? (
                            <StarIcon />
                        ) : (
                            <FormatListNumberedIcon />
                        )
                    }
                    variant="contained"
                >
                    <Typography variant="body1">
                        {toggleFullResults ? 'Top Picks' : 'Full Results List'}
                    </Typography>
                </Button>
                <Button
                    className="share-button"
                    onClick={handleShareResults}
                    endIcon={<ShareIcon />}
                    variant="outlined"
                >
                    <Typography variant="body1">Share Your Results</Typography>
                </Button>
            </>
        );
    };

    return (
        <div className="results-page">
            {loadingRecommendations ? (
                <LoadingRecommendations />
            ) : (
                renderRecommendations()
            )}
        </div>
    );
}

export default ResultsPage;
