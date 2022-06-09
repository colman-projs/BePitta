import { Grid, Button, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';
import { ArrowForwardIos as ArrowForwardIosIcon } from '@mui/icons-material';

import { getRestaurantTagsById } from '../../actions/preferencesActions';
import { getRestaurantById } from '../../actions/restaurantActions';
import { GlobalContext } from '../../context/GlobalContext';
import { socket } from '../../socket/index';
import { cookie } from '../../actions/cookieActions';

import './PreferencesForm.scss';

function PreferencesForm() {
    const [loadingPreferencesPhoto, setLoadingPreferencesPhoto] =
        useState(false);
    const { setIsLoadingApp } = useContext(GlobalContext);
    const [restaurant, setRestaurant] = useState(null);
    const [tags, setTags] = useState(null);
    const navigate = useNavigate();
    const alert = useAlert();

    let { groupId, restaurantId } = useParams();

    useEffect(() => {
        //Fetch restaurant tags
        const fetchRestaurantTags = async () => {
            setIsLoadingApp(true);
            const tags = await getRestaurantTagsById(restaurantId);

            if (!tags) {
                alert.error('Error loading restaurant tags');
                return setIsLoadingApp(false);
            }

            setTags(tags);

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

        const userId = cookie.getCookie(cookie.siteCookies.userId);
        socket.emit('group-connect', groupId, userId);

        fetchRestaurantTags();
        fetchRestaurant();
    }, [groupId, restaurantId, alert, setIsLoadingApp]);

    const handleButtonClick = tagId => {
        let tempTags = JSON.parse(JSON.stringify(tags));

        tempTags.forEach(tag => {
            if (tag.id === tagId) tag.Active = !tag.Active;

            tag = { ...tag, Active: tag.Active };
        });

        setTags(tempTags);
    };

    const handleNext = e => {
        setIsLoadingApp(true);

        // TODO: Save user preferences in DB

        if (!groupId) {
            alert.error('Error while loading Like/Dislike page');
            return setLoadingPreferencesPhoto(false);
        }

        navigate(`/groups/${groupId}/${restaurantId}/likes`);

        setIsLoadingApp(false);
    };

    return (
        <div className="preferences-form center">
            <img
                className="restaurant-logo"
                src={restaurant?.imageurl}
                alt="Restaurant Logo"
            />
            <Typography variant="h5">Preferences:</Typography>

            <Grid
                container
                spacing={{ xs: 1, md: 1 }}
                columns={{ xs: 4, sm: 4, md: 4 }}
                className="Grid"
            >
                {tags?.map(tag => (
                    <Grid
                        item
                        xs={2}
                        sm={2}
                        md={2}
                        key={tag.id}
                        className="GridContainer"
                    >
                        <Button
                            id={tag.id}
                            type="button"
                            variant="outlined"
                            onClick={() => {
                                handleButtonClick(tag.id);
                            }}
                            className={
                                tag.Active
                                    ? 'ButtonContaineractive'
                                    : 'ButtonContainer'
                            }
                        >
                            {tag.value}
                        </Button>
                    </Grid>
                ))}
            </Grid>
            <LoadingButton
                loading={loadingPreferencesPhoto}
                className="next-button"
                variant="contained"
                color="primary"
                onClick={handleNext}
                endIcon={<ArrowForwardIosIcon />}
                loadingPosition="end"
            >
                <Typography variant="h7">Next</Typography>
            </LoadingButton>
        </div>
    );
}

export default PreferencesForm;
