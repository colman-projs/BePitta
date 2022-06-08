const RECOMMENDER_SERVER_URL = require('../globals').config.recommenderServerUrl;

const getRecommendation = async(req,res)=>{
    res.send("RECOMMENDATION!")
}

module.exports = {
    getRecommendation
}