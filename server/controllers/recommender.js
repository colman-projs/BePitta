const axios = require('axios').default;

const RECOMMENDER_SERVER_URL =
    require('../globals').config.recommenderServerUrl;

const getRecommendation = async (req, res) => {
    const recommendation = await axios.get(
        `${RECOMMENDER_SERVER_URL}/recommender/${req.params.groupId}`,
    );

    res.set('Content-Type', 'application/json');
    res.send(recommendation.data);
};

module.exports = {
    getRecommendation,
};
