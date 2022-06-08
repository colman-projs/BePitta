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

import './ResultsPage.scss';

const dishesBenda = [
    {
        id: '629202c76a579f0257f7aadb',
        match: 0.92,
        users: [1, 3],
    },
];

function ResultsPage() {
    const resultsRef = useRef();
    const [dishes, setDishes] = useState([]);
    const [results, setResults] = useState([]);
    const [restaurant, setRestaurant] = useState(null);
    const [toggleFullResults, setToggleFullResults] = useState(false);
    let { groupId, restaurantId } = useParams();
    const alert = useAlert();

    const { setIsLoadingApp } = useContext(GlobalContext);

    useEffect(() => {
        // TODO: Call calculating algorithem to calculate final results
        // await getFinalResults(groupId)
        setDishes(dishesBenda);
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

            setResults([
                ...dishesRes,
                ...dishesRes,
                ...dishesRes,
                ...dishesRes,
                ...dishesRes,
                ...dishesRes,
                ...dishesRes,
            ]);
            setIsLoadingApp(false);
        };

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

    return (
        <div className="results-page">
            <img
                className="restaurant-logo"
                src={restaurant?.imageurl}
                alt="Restaurant Logo"
            />
            {toggleFullResults ? (
                <FullResultsList results={results} />
            ) : (
                <>
                    <Typography className="title" variant="h5">
                        Top 3 Picks for you:
                    </Typography>
                    <ResultsList results={results} ref={resultsRef} />
                    <div className="half-circle" />
                    <Button
                        className="share-button"
                        onClick={handleShareResults}
                        endIcon={<ShareIcon />}
                        variant="contained"
                    >
                        <Typography variant="body1">
                            Share Your Results
                        </Typography>
                    </Button>
                </>
            )}
            <Button
                onClick={() => setToggleFullResults(prevState => !prevState)}
                startIcon={
                    toggleFullResults ? (
                        <StarIcon />
                    ) : (
                        <FormatListNumberedIcon />
                    )
                }
                variant="outlined"
            >
                <Typography variant="body1">
                    {toggleFullResults ? 'Top 3 Picks' : 'Full Results List'}
                </Typography>
            </Button>
        </div>
    );
}

export default ResultsPage;
