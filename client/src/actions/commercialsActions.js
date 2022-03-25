import authHeader from '../api/auth-header';
import commercials from '../api/commercials';

export const getCommercials = async screenId => {
    try {
        const { data } = await commercials.get(screenId ? `/${screenId}` : '/');

        return data;
    } catch (e) {
        console.error(e);
    }
};

export const getCommercialById = async commercialId => {
    try {
        const { data } = await commercials.get(`/${commercialId}`, {
            headers: authHeader(),
        });

        return data;
    } catch (e) {
        console.error(e);
    }
};

export const upsertCommercial = async commercial => {
    try {
        const { data } = await commercials.post('/', commercial, {
            headers: authHeader(),
        });

        return data;
    } catch (e) {
        console.error(e);
    }
};

export const deleteCommercial = async commercialId => {
    try {
        const { data } = await commercials.delete(`/${commercialId}`, {
            headers: authHeader(),
        });

        return data;
    } catch (e) {
        console.error(e);
    }
};
