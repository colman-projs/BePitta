const express = require('express');
const restaurantController = require('../controllers/restaurant');
const authJwt = require('../middleware/authJwt');
const router = express.Router();

router.get('/', restaurantController.getRestaurants);

//  router.get('/:groupId(\\d+)', restaurantController.getRestaurantsGroupById);

router.get(
    '/:restaurantId',
    //  authJwt.verifyToken,
    restaurantController.getRestaurantById,
);

router.post('/', authJwt.verifyToken, restaurantController.upsertRestaurant);

router.delete(
    '/:restaurantId',
    //  authJwt.verifyToken,
    restaurantController.deleteRestaurant,
);

module.exports = router;
