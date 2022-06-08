const express = require('express');
const tagController = require('../controllers/tag');
const authJwt = require('../middleware/authJwt');
const router = express.Router();

/**
 * @swagger
 * /tags/:
 *   get:
 *       summary: Get tags
 *       description: need to provide the refresh token in the auth header
 *       tags:
 *       - tags
 *       responses:
 *           200:
 *               description: Get tags completed successfully
 *   post:
 *       summary: Create a tag
 *       description: need to provide the required json
 *       tags:
 *       - tags
 *       requestBody:
 *           required: true
 *           content:
 *               application/json:
 *                   schema:
 *                       $ref: '#\models\schemas\restaurant.js'
 *       responses:
 *           200:
 *               description: Tag created successfully
 * /tag/tagId:
 *   get:
 *       summary: Get tag by tag ID
 *       description: need to provide the required restaurant ID
 *       tags:
 *       - tags
 *       responses:
 *           200:
 *               description: Get tags completed successfully
 *   delete:
 *       summary: Delete tag by ID
 *       description: need to provide the required restaurant ID
 *       tags:
 *       - tags
 *       responses:
 *           200:
 *               description: Delete tag completed successfully
 */

router.get('/', authJwt.verifyToken, tagController.getTags);

router.get('/:tagId', authJwt.verifyToken, tagController.getTagById);

router.post('/', authJwt.verifyToken, tagController.upsertTag);

router.delete('/:tagId', authJwt.verifyToken, tagController.deleteTag);

module.exports = router;
