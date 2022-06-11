import recommender from '../api/recommender';

export const getRecommendations = async groupId => {
    try {
        const { data } = await recommender.get(`/${groupId}`);

        return data;
    } catch (e) {
        console.error(e);
    }
};
