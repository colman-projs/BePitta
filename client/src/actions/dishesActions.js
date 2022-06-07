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
