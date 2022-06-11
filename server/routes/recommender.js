const express = require('express');
const recommenderController = require('../controllers/recommender');
const router = express.Router();

/**
 * @swagger
 * /recommender/groupId:
 *   get:
 *       summary: Get recommendation
 *       description: Get the recommendation for a group
 *       tags:
 *       - Recommender
 *       parameters:
 *       - in: path
 *         name: groupId
 *         type: string
 *         required: true
 *         description: group ID
 *       responses:
 *           200:
 *               description: Get recommendation completed successfully
 *           400:
 *               description: The request is invalid
 */

router.get('/:groupId', recommenderController.getRecommendation);

module.exports = router;
