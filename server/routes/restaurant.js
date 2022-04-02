 const express = require('express');
 const restaurantController = require('../controllers/restaurant');
 const authJwt = require('../middleware/authJwt');
 const router = express.Router();
 
 router.get('/', restaurantController.getRestaurants);
 
//  router.get('/:groupId(\\d+)', restaurantController.getRestaurantsGroupById);
 
 router.get(
     '/:restaurantId',
     authJwt.verifyToken,
     restaurantController.getresturantById,
 );
 
 router.post('/', authJwt.verifyToken, restaurantController.upsertRestaurant);
 
 router.delete(
     '/:restaurantId',
     authJwt.verifyToken,
     restaurantController.deleteResturant,
 );
 
 module.exports = router;
 