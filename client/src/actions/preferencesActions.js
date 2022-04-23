import authHeader from '../api/auth-header';
import tags from '../api/preferences';
import DataModel  from '../Data.json'

export const getRestaurantTagsById = async restaurantId => {
    try {
        // const { data } = await tags.get(`/${restaurantId}`, {
        //     headers: authHeader(),
        // });
        const  data  = DataModel; 


        return data;
    } catch (e) {
        console.error(e);
    }
};

export const getRestaurantsTags = async () => {
    try {
        const { data } = await tags.get('/');

        return data;
    } catch (e) {
        console.error(e);
    }
};
