const axios = require('axios').default;

const RECOMMENDER_SERVER_URL =
    require('../globals').config.recommenderServerUrl;

const getRecommendation = async (req, res) => {
    try {
        const rec = await axios.get(
            `${RECOMMENDER_SERVER_URL}/recommender/${req.params.groupId}`,
        );

        res.type('json');
        res.send(rec.data);
    } catch (e) {
        res.status(e.response?.status || 500).send(e.response?.data);
    }
};

module.exports = {
    getRecommendation,
};
