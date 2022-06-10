import authHeader from '../api/auth-header';
import restaurants from '../api/restaurants';

export const getRestaurantById = async restaurantId => {
    try {
        const { data } = await restaurants.get(`/${restaurantId}`, {
            headers: authHeader(),
        });

        return data;
    } catch (e) {
        console.error(e);
    }
};

export const getRestaurants = async () => {
    try {
        const { data } = await restaurants.get('/');

        return data;
    } catch (e) {
        console.error(e);
    }
};

export const upsertRestaurant = async restaurant => {
    try {
        const { data } = await restaurants.post('/', restaurant);

        return data;
    } catch (e) {
        console.error(e);
    }
};

export const deleteRestaurant = async restaurantId => {
    try {
        const { data } = await restaurants.delete(`/${restaurantId}`);

        return data;
    } catch (e) {
        console.error(e);
    }
};

export const getRestaurantDishes = async restaurantId => {
    try {
        const { data } = await restaurants.get(`/${restaurantId}/dishes`);
        return data;
    } catch (e) {
        console.error(e);
    }
};
