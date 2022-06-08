const express = require('express');
const groupController = require('../controllers/group');
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

router.get('/', groupController.getGroups);

router.get(
    '/:groupId',
    // authJwt.verifyToken,
    groupController.getgroupById,
);


router.post('/',
    // authJwt.verifyToken,
    groupController.upsertGroup
);

router.delete(
    '/:groupId',
    authJwt.verifyToken,
    groupController.deleteGroup,
);

module.exports = router;
