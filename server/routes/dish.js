const express = require('express');
const dishController = require('../controllers/dish');
const authJwt = require('../middleware/authJwt');
const router = express.Router();

/**
* @swagger
* /dishes/:
*   get:
*       summary: Get dishes
*       description: need to provide the refresh token in the auth header
*       tags:
*       - dishes
*       responses:
*           200:
*               description: Get dishes completed successfully
*   post:
*       summary: Create a dish
*       description: need to provide the required json
*       tags:
*       - dishes
*       requestBody:
*           required: true
*           content:
*               application/json:
*                   schema:
*                       $ref: '#\models\schemas\restaurant.js'
*       responses:
*           200:
*               description: Dish created successfully
* /dishes/dishId:
*   get:
*       summary: Get dish by ID
*       description: need to provide the required restaurant ID
*       tags:
*       - dishes
*       responses:
*           200:
*               description: Get dishes completed successfully
*   delete:
*       summary: Delete dish by ID
*       description: need to provide the required restaurant ID
*       tags:
*       - dishes
*       responses:
*           200:
*               description: Delete dish completed successfully
*/

router.get('/', dishController.getDishes);

router.get(
    '/:dishId',
      authJwt.verifyToken,
    dishController.getdishById,
);

router.post(
    '/',
      authJwt.verifyToken,
    dishController.upsertDish,
);

router.delete(
    '/:dishId',
      authJwt.verifyToken,
    dishController.deleteDish,
);

module.exports = router;
