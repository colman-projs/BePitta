import React, { useCallback, useContext, useEffect, useState } from 'react';
import { TextField, Button, Typography, Switch, MenuItem } from '@mui/material';
import { useAlert } from 'react-alert';

import { deleteDish, getDishes, upsertDish } from '../../actions/dishesActions';
import { GlobalContext } from '../../context/GlobalContext';

import './ManageDishes.scss';

const emptyDish = {
    name: '',
    // TODO: Add insert tags in UI
    tags: [],
    imageUrl: '',
    description: '',
};

function ManageDishes() {
    const [editMode, setEditMode] = useState(false);
    const [dishes, setDishes] = useState([]);
    const [currentDish, setCurrentDish] = useState(emptyDish);
    const [id, setId] = useState(null);
    const { setIsLoadingApp } = useContext(GlobalContext);
    const alert = useAlert();

    const fetchDishes = useCallback(async () => {
        setIsLoadingApp(true);
        const res = await getDishes();

        if (!res) {
            alert.error('Error loading dishes');
            return setIsLoadingApp(false);
        }

        setDishes(res);
        setIsLoadingApp(false);
    }, [alert, setIsLoadingApp]);

    useEffect(() => {
        fetchDishes();
    }, [fetchDishes]);

    const toggleEditMode = () => {
        setCurrentDish(emptyDish);
        setId(null);
        setEditMode(prevState => !prevState);
    };

    useEffect(() => {
        const dish = dishes.find(res => res._id === id);

        if (!dish) return;

        setCurrentDish(dish);
    }, [id, dishes]);

    const handleSubmit = async e => {
        e.preventDefault();

        setIsLoadingApp(true);

        const success = await upsertDish(currentDish);

        if (!success) {
            alert.error('Error saving dish');
            return setIsLoadingApp(false);
        }

        alert.success(`Dish ${editMode ? 'Updated' : 'Created'} successfuly`);
        await fetchDishes();
        setIsLoadingApp(false);
    };

    const handleChangeDish = e => {
        const { name, value } = e.target;

        setCurrentDish(prevState => {
            return { ...prevState, [name]: value };
        });
    };

    const handleDelete = async () => {
        setIsLoadingApp(true);

        const success = await deleteDish(id);

        if (!success) {
            alert.error('Error deleting dish');
            return setIsLoadingApp(false);
        }

        alert.success('Dish deleted successfuly');
        setCurrentDish(emptyDish);
        setId(null);
        await fetchDishes();
        setIsLoadingApp(false);
    };

    return (
        <div className="manage-dishes center">
            <Typography className="title" variant="h6">
                Dishes Management
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
                        value={currentDish?._id}
                        onChange={e => setId(e.target.value)}
                    >
                        {dishes.map(option => (
                            <MenuItem key={option._id} value={option._id}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </TextField>
                )}
                <TextField
                    required
                    label="Name"
                    name="name"
                    value={currentDish.name}
                    onChange={handleChangeDish}
                />
                <TextField
                    required
                    label="Description"
                    name="description"
                    value={currentDish.description}
                    onChange={handleChangeDish}
                />
                <TextField
                    required
                    label="Image Url"
                    name="imageUrl"
                    value={currentDish.imageUrl}
                    onChange={handleChangeDish}
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

export default ManageDishes;
