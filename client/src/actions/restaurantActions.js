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
