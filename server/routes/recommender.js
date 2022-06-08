const express = require('express');
const recommenderController = require('../controllers/recommender');
const authJwt = require('../middleware/authJwt');
const router = express.Router();

/**
 * @swagger
 * /recommender/groupId:
 *   get:
 *       summary: Get recommendation
 *       description: Get the recommendation for a group
 *       tags:
 *       - Recommender
 *       responses:
 *           200:
 *               description: Get recommendation completed successfully
 *           400:
 *               description: The request is invalid
 */

router.get(
    '/:groupId',
    //authJwt.verifyToken,
    recommenderController.getRecommendation,
);

module.exports = router;
