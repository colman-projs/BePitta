const express = require('express');
const restaurantController = require('../controllers/restaurant');
const authJwt = require('../middleware/authJwt');
const router = express.Router();

/**
 * @swagger
 * /restaurants/:
 *   get:
 *       summary: Get restaurants
 *       description: need to provide the refresh token in the auth header
 *       tags:
 *       - restaurants
 *       responses:
 *           200:
 *               description: Get restaurants completed successfully
 *   post:
 *       summary: Create a restaurant
 *       description: need to provide the required json
 *       tags:
 *       - restaurants
 *       requestBody:
 *           required: true
 *           content:
 *               application/json:
 *                   schema:
 *                       $ref: '#\models\schemas\restaurant.js'
 *       responses:
 *           200:
 *               description: Restaurant created successfully
 * /restaurants/restaurantId:
 *   get:
 *       summary: Get restaurants by restaurant ID
 *       description: need to provide the required restaurant ID
 *       tags:
 *       - restaurants
 *       responses:
 *           200:
 *               description: Get restaurants completed successfully
 *   delete:
 *       summary: Delete restaurants by restaurant ID
 *       description: need to provide the required restaurant ID
 *       tags:
 *       - restaurants
 *       responses:
 *           200:
 *               description: Delete restaurant completed successfully
 */
router.get('/', restaurantController.getRestaurants);

router.get('/:restaurantId', restaurantController.getRestaurantById);

router.post('/', restaurantController.upsertRestaurant);

router.delete('/:restaurantId', restaurantController.deleteRestaurant);

module.exports = router;
