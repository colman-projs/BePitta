const express = require('express');
const group = require('./group');
const tag = require('./tag');
const dish = require('./dish');
const admin = require('./admin');
const restaurant = require('./restaurant');
const recommender = require('./recommender');
const routes = express.Router();

routes.use('/restaurants', restaurant);
routes.use('/groups', group);
routes.use('/tags', tag);
routes.use('/dishes', dish);
routes.use('/recommender', recommender);

module.exports = routes;
