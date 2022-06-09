// import authHeader from '../api/auth-header';
import dishes from '../api/dishes';

export const getDishesByIds = async dishesIds => {
    try {
        const { data } = await dishes.post('/dishes', { ids: dishesIds });

        return data;
    } catch (e) {
        console.error(e);
    }
};

export const getDishes = async () => {
    try {
        const { data } = await dishes.get('/');

        return data;
    } catch (e) {
        console.error(e);
    }
};

export const upsertDish = async dish => {
    try {
        const { data } = await dishes.post('/', dish);

        return data;
    } catch (e) {
        console.error(e);
    }
};

export const deleteDish = async dishId => {
    try {
        const { data } = await dishes.delete(`/${dishId}`);

        return data;
    } catch (e) {
        console.error(e);
    }
};
