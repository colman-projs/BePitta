const express = require('express');
const group = require('./group');
const tag = require('./tag');
const dish = require('./dish');
const admin = require('./admin');
const restaurant = require('./restaurant');
const routes = express.Router();

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

routes.use('/restaurants', restaurant);
routes.use('/groups', group);
routes.use('/tags', tag);
routes.use('/dishes', dish);

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'BePitta API with Swagger',
            version: '1.0.0',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ['./restaurant.js', './dish.js'],
};

const specs = swaggerJsdoc(options);
routes.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

module.exports = routes;
