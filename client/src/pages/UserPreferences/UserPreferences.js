import { Grid, Button, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import LoadingButton from '@mui/lab/LoadingButton';
import { Save as SaveIcon } from '@mui/icons-material';

import { getRestaurantsTags } from '../../actions/preferencesActions';
import { GlobalContext } from '../../context/GlobalContext';

import './UserPreferences.scss';

function UserPreferences() {
    const [savingTags, setSavingTags] = useState(false);
    const { setIsLoadingApp } = useContext(GlobalContext);
    const [tags, setTags] = useState([]);
    const alert = useAlert();

    useEffect(() => {
        const fetchTags = async () => {
            setIsLoadingApp(true);
            const tags = await getRestaurantsTags();

            if (!tags) {
                alert.error('Error loading preferences');
                return setIsLoadingApp(false);
            }

            setTags(tags);

            setIsLoadingApp(false);
        };

        fetchTags();
    }, [alert, setIsLoadingApp]);

    const handleButtonClick = tagId => {
        let tempTags = JSON.parse(JSON.stringify(tags));

        tempTags.forEach(tag => {
            if (tag._id === tagId) tag.isActive = !tag.isActive;

            tag = { ...tag, isActive: tag.isActive };
        });

        setTags(tempTags);
    };

    const handleSave = async () => {
        setSavingTags(true);

        console.log(
            'Liked Tags: ',
            tags.filter(tag => tag.isActive).map(tag => tag._id),
        );
        // TODO: Call backend function to update user preferences
        // const success = await saveUserPreferences(tags.filter(tag=> tag.isActive).map(tag => tag._id));
        let success = false;
        if (!success) alert.error('Error Updating preferences');
        else alert.success('Updated preferences succesfully');

        setSavingTags(false);
    };

    return (
        <div className="user-preferences-form center">
            <Typography variant="h5">My Preferences:</Typography>
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
                                tag.isActive
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
                loading={savingTags}
                className="next-button"
                variant="contained"
                color="primary"
                onClick={handleSave}
                endIcon={<SaveIcon />}
                loadingPosition="end"
            >
                <Typography variant="h7">Update</Typography>
            </LoadingButton>
        </div>
    );
}

export default UserPreferences;
