import React, { useCallback, useContext, useEffect, useState } from 'react';
import { TextField, Button, Typography, Switch, MenuItem } from '@mui/material';
import { useAlert } from 'react-alert';

import {
    deleteRestaurant,
    getRestaurants,
    upsertRestaurant,
} from '../../actions/restaurantActions';
import { GlobalContext } from '../../context/GlobalContext';
import { getDishes } from '../../actions/dishesActions';
import MultipleSelect from '../../components/MultipleSelect/MultipleSelect';

import './ManageRestaurants.scss';

const emptyRestaurant = {
    name: '',
    description: '',
    imageurl: '',
    dishes: [],
};

function ManageRestaurants() {
    const [editMode, setEditMode] = useState(false);
    const [restaurants, setRestaurants] = useState([]);
    const [currentRestaurant, setCurrentRestaurant] = useState(emptyRestaurant);
    const [dishes, setDishes] = useState([]);
    const [id, setId] = useState(null);
    const { setIsLoadingApp } = useContext(GlobalContext);
    const alert = useAlert();

    const fetchRestaurants = useCallback(async () => {
        setIsLoadingApp(true);
        const res = await getRestaurants();

        if (!res) {
            alert.error('Error loading restaurants');
            return setIsLoadingApp(false);
        }

        setRestaurants(res);
        setIsLoadingApp(false);
    }, [alert, setIsLoadingApp]);

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
        fetchRestaurants();
        fetchDishes();
    }, [fetchRestaurants, fetchDishes]);

    const toggleEditMode = () => {
        setCurrentRestaurant(emptyRestaurant);
        setId(null);
        setEditMode(prevState => !prevState);
    };

    useEffect(() => {
        const restaurant = restaurants.find(res => res._id === id);

        if (!restaurant) return;

        setCurrentRestaurant(restaurant);
    }, [id, restaurants]);

    const handleSubmit = async e => {
        e.preventDefault();

        setIsLoadingApp(true);

        const success = await upsertRestaurant(currentRestaurant);

        if (!success) {
            alert.error('Error saving restaurant');
            return setIsLoadingApp(false);
        }

        alert.success(
            `Restaurant ${editMode ? 'Updated' : 'Created'} successfuly`,
        );
        await fetchRestaurants();
        setIsLoadingApp(false);
    };

    const handleChangeRestaurant = e => {
        const { name, value } = e.target;

        setCurrentRestaurant(prevState => {
            return { ...prevState, [name]: value };
        });
    };

    const handleDelete = async () => {
        setIsLoadingApp(true);

        const success = await deleteRestaurant(id);

        if (!success) {
            alert.error('Error deleting restaurant');
            return setIsLoadingApp(false);
        }

        alert.success('Restaurant deleted successfuly');
        setCurrentRestaurant(emptyRestaurant);
        setId(null);
        await fetchRestaurants();
        setIsLoadingApp(false);
    };

    const handleChangeDishes = event => {
        const {
            target: { value },
        } = event;
        setCurrentRestaurant({
            ...currentRestaurant,
            dishes: typeof value === 'string' ? value.split(',') : value,
        });
    };

    return (
        <div className="manage-restaurants center">
            <Typography className="title" variant="h6">
                Restaurants Management
            </Typography>
            <span className="edit-switch">
                Create Mode
                <Switch
                    color="primary"
                    onChange={toggleEditMode}
                    value={editMode}
                />
                Edit Mode
            </span>
            <form className="form" onSubmit={handleSubmit}>
                {editMode && (
                    <TextField
                        select
                        label="ID"
                        value={currentRestaurant?._id}
                        onChange={e => setId(e.target.value)}
                    >
                        {restaurants.map(option => (
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
                    value={currentRestaurant.name}
                    onChange={handleChangeRestaurant}
                />
                <TextField
                    required
                    label="Description"
                    name="description"
                    value={currentRestaurant.description}
                    onChange={handleChangeRestaurant}
                />
                <TextField
                    required
                    label="Image Url"
                    name="imageurl"
                    value={currentRestaurant.imageurl}
                    onChange={handleChangeRestaurant}
                />
                <MultipleSelect
                    value={currentRestaurant.dishes}
                    handleChange={handleChangeDishes}
                    label="Dishes"
                    options={dishes.map(dish => {
                        return {
                            ...dish,
                            value: dish.name,
                        };
                    })}
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

export default ManageRestaurants;
