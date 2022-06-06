const express = require('express');
const recommenderController = require('../controllers/recommender');
const router = express.Router();

router.get('/:groupId', recommenderController.getRecommendations);

module.exports = router;
