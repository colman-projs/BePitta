const express = require('express');
const clientController = require('../controllers/client');
const router = express.Router();

/**
 * @swagger
 * /clients/:
 *   get:
 *       summary: Get clients
 *       description:
 *       tags:
 *       - clients
 *       responses:
 *           200:
 *               description: Get clients completed successfully
 * /clients/id:
 *   get:
 *       summary: Get client by ID
 *       description:
 *       tags:
 *       - clients
 *       parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *         description: client ID
 *       responses:
 *           200:
 *               description: Get client by Id completed successfully
 *   post:
 *       summary: Create a client
 *       description: need to provide the required json
 *       tags:
 *       - clients
 *       requestBody:
 *           required: true
 *           content:
 *               application/json:
 *                   schema:
 *                       $ref: '#\models\schemas\client.js'
 *       responses:
 *           200:
 *               description: client created successfully
 * /clients/clientId:
 *   put:
 *       summary: Update client by ID
 *       description: need to provide the required client ID
 *       tags:
 *       - clients
 *       parameters:
 *       - in: path
 *         name: clientId
 *         type: string
 *         required: true
 *         description: client ID
 *       requestBody:
 *           required: true
 *           content:
 *               application/json:
 *                   schema:
 *                       $ref: '#\models\schemas\client.js'
 *       responses:
 *           200:
 *               description: Update client completed successfuly
 */

router.get('/', clientController.getClients);

router.get('/byGoogle/:googleId', clientController.getClientByGoogleId);

router.get('/:clientId', clientController.getClientById);

router.post('/', clientController.createClient);

router.put('/:clientId', clientController.updateClient);

router.put('/:clientId/tags', clientController.updateClientTags);

module.exports = router;
