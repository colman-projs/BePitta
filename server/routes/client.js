const express = require('express');
const clientController = require('../controllers/client');
const authJwt = require('../middleware/authJwt');
const router = express.Router();

/**
 * @swagger
 * /groups/:
 *   get:
 *       summary: Get groups
 *       description: need to provide the refresh token in the auth header
 *       tags:
 *       - groups
 *       responses:
 *           200:
 *               description: Get groups completed successfully
 *   post:
 *       summary: Create a group
 *       description: need to provide the required json
 *       tags:
 *       - groups
 *       requestBody:
 *           required: true
 *           content:
 *               application/json:
 *                   schema:
 *                       $ref: '#\models\schemas\groups.js'
 *       responses:
 *           200:
 *               description: group created successfully
 * /group/groupId:
 *   get:
 *       summary: Get group by ID
 *       description: need to provide the required group ID
 *       tags:
 *       - groups
 *       responses:
 *           200:
 *               description: Get groups completed successfully
 *   delete:
 *       summary: Delete group by ID
 *       description: need to provide the required restaurant ID
 *       tags:
 *       - groups
 *       responses:
 *           200:
 *               description: Delete group completed successfully
 */

router.get('/', clientController.getClients);

// router.get(
//     '/:clientId',
//     authJwt.verifyToken,
//     clientController.get,
// );

router.post('/', authJwt.verifyToken, clientController.createClient);

router.put('/:clientId', authJwt.verifyToken, clientController.updateClient);

// router.delete(
//     '/:groupId',
//     authJwt.verifyToken,
//     clientController.deleteGroup,
// );

module.exports = router;
