import React, { useCallback, useContext, useEffect, useState } from 'react';
import { TextField, Button, Typography, Switch, MenuItem } from '@mui/material';
import { useAlert } from 'react-alert';

import {
    deleteTag,
    getTags,
    upsertTag,
} from '../../actions/preferencesActions';
import { GlobalContext } from '../../context/GlobalContext';

import './ManageTags.scss';

const emptyTag = {
    value: '',
    weight: '',
};

function ManageTags() {
    const [editMode, setEditMode] = useState(false);
    const [tags, setTags] = useState([]);
    const [currentTag, setCurrentTag] = useState(emptyTag);
    const [id, setId] = useState(null);
    const { setIsLoadingApp } = useContext(GlobalContext);
    const alert = useAlert();

    const fetchTags = useCallback(async () => {
        setIsLoadingApp(true);
        const res = await getTags();

        if (!res) {
            alert.error('Error loading tags');
            return setIsLoadingApp(false);
        }

        setTags(res);
        setIsLoadingApp(false);
    }, [alert, setIsLoadingApp]);

    useEffect(() => {
        fetchTags();
    }, [fetchTags]);

    const toggleEditMode = () => {
        setCurrentTag(emptyTag);
        setId(null);
        setEditMode(prevState => !prevState);
    };

    useEffect(() => {
        const tag = tags.find(res => res._id === id);

        if (!tag) return;

        setCurrentTag(tag);
    }, [id, tags]);

    const handleSubmit = async e => {
        e.preventDefault();

        setIsLoadingApp(true);

        const success = await upsertTag(currentTag);

        if (!success) {
            alert.error('Error saving tag');
            return setIsLoadingApp(false);
        }

        alert.success(`Tag ${editMode ? 'Updated' : 'Created'} successfuly`);
        await fetchTags();
        setIsLoadingApp(false);
    };

    const handleChangeTag = e => {
        const { name, value } = e.target;

        setCurrentTag(prevState => {
            return { ...prevState, [name]: value };
        });
    };

    const handleDelete = async () => {
        setIsLoadingApp(true);

        const success = await deleteTag(id);

        if (!success) {
            alert.error('Error deleting tag');
            return setIsLoadingApp(false);
        }

        alert.success('Tag deleted successfuly');
        setCurrentTag(emptyTag);
        setId(null);
        await fetchTags();
        setIsLoadingApp(false);
    };

    return (
        <div className="manage-tags center">
            <Typography className="title" variant="h6">
                Tags Management
            </Typography>
            <span className="edit-switch">
                Edit Mode
                <Switch
                    color="primary"
                    onChange={toggleEditMode}
                    value={editMode}
                />
                Create Mode
            </span>
            <form className="form" onSubmit={handleSubmit}>
                {editMode && (
                    <TextField
                        select
                        label="ID"
                        value={currentTag?._id}
                        onChange={e => setId(e.target.value)}
                    >
                        {tags.map(option => (
                            <MenuItem key={option._id} value={option._id}>
                                {option.value}
                            </MenuItem>
                        ))}
                    </TextField>
                )}
                <TextField
                    required
                    label="Tag"
                    name="value"
                    value={currentTag.value}
                    onChange={handleChangeTag}
                />
                <TextField
                    required
                    label="Weight"
                    name="weight"
                    value={currentTag.weight}
                    onChange={handleChangeTag}
                    type="number"
                />
                <div className="actions">
                    <Button variant="contained" color="primary" type="submit">
                        {editMode ? 'Update' : 'Create'}
                    </Button>
                    {editMode && (
                        <Button
                            className="delete"
                            variant="contained"
                            color="secondary"
                            onClick={handleDelete}
                        >
                            Delete
                        </Button>
                    )}
                </div>
            </form>
        </div>
    );
}

export default ManageTags;
