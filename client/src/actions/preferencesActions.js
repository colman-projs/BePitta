import tags from '../api/preferences';

export const getTags = async () => {
    try {
        const { data } = await tags.get('/');

        return data;
    } catch (e) {
        console.error(e);
    }
};

export const upsertTag = async tag => {
    try {
        const { data } = await tags.post('/', tag);

        return data;
    } catch (e) {
        console.error(e);
    }
};

export const deleteTag = async tagId => {
    try {
        const { data } = await tags.delete(`/${tagId}`);

        return data;
    } catch (e) {
        console.error(e);
    }
};
