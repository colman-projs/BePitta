import { Grid, Button, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';
import { ArrowForwardIos as ArrowForwardIosIcon } from '@mui/icons-material';

import { getTags } from '../../actions/preferencesActions';
import { getRestaurantById } from '../../actions/restaurantActions';
import { GlobalContext } from '../../context/GlobalContext';
import { socket } from '../../socket/index';
import { UserIdContext } from '../../context/UserIdContext';
import { getUserById, updateUserTags } from '../../actions/userActions';

import './PreferencesForm.scss';

function PreferencesForm() {
    const [loadingPreferencesPhoto, setLoadingPreferencesPhoto] =
        useState(false);
    const { setIsLoadingApp } = useContext(GlobalContext);
    const { userId } = useContext(UserIdContext);
    const [restaurant, setRestaurant] = useState(null);
    const [tags, setTags] = useState(null);
    const navigate = useNavigate();
    const alert = useAlert();

    let { groupId, restaurantId } = useParams();

    useEffect(() => {
        //Fetch restaurant tags
        const fetchRestaurantTags = async () => {
            setIsLoadingApp(true);
            const tagsRes = await getTags();

            let user = null;
            if (userId) {
                user = await getUserById(userId);
            }

            if (!tagsRes) {
                alert.error('Error loading restaurant tags');
                return setIsLoadingApp(false);
            }

            tagsRes.forEach(tag => {
                if (user?.tags?.some(userTag => userTag === tag._id)) {
                    tag = { ...tag, isActive: true };
                }
            });

            setTags(tagsRes);

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

        if (!restaurantId || !groupId || !userId) return;

        socket.emit('group-connect', groupId, userId);

        fetchRestaurantTags();
        fetchRestaurant();
    }, [groupId, restaurantId, alert, setIsLoadingApp, userId]);

    const handleButtonClick = tagId => {
        let tempTags = JSON.parse(JSON.stringify(tags));

        tempTags.forEach(tag => {
            if (tag._id === tagId) tag.Active = !tag.Active;

            tag = { ...tag, Active: tag.Active };
        });

        setTags(tempTags);
    };

    const handleNext = async e => {
        setLoadingPreferencesPhoto(true);

        console.log(
            'Tags to save: ',
            tags.filter(tag => tag.Active).map(tag => tag._id),
        );

        const success = await updateUserTags(
            userId,
            tags.filter(tag => tag.Active).map(tag => tag._id),
        );

        if (!success) {
            alert.error('Error while updating preferences');
            return setLoadingPreferencesPhoto(false);
        }

        if (!groupId) {
            alert.error('Error while loading Like/Dislike page');
            return setLoadingPreferencesPhoto(false);
        }

        navigate(`/groups/${groupId}/${restaurantId}/likes`);
        setLoadingPreferencesPhoto(false);
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
                        key={tag._id}
                        className="GridContainer"
                    >
                        <Button
                            id={tag._id}
                            type="button"
                            variant="outlined"
                            onClick={() => {
                                handleButtonClick(tag._id);
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
