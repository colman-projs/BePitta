const express = require('express');
const groupController = require('../controllers/group');
const authJwt = require('../middleware/authJwt');
const router = express.Router();

router.get('/', groupController.getGroups);


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
