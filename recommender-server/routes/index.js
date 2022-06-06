const express = require('express');
const recommender = require('./recommender');
const routes = express.Router();

routes.use('/recommender', recommender);

module.exports = routes;
