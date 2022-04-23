import authHeader from '../api/auth-header';
import DataModel  from '../images.json'

export const getImagesByRestaurantId = async restaurantId => {
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

export const getAllImages = async () => {
    try {
        // const { data } = await tags.get('/');
        const  data  = DataModel; 

        return data;
    } catch (e) {
        console.error(e);
    }
};
