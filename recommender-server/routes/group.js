const express = require('express');
const groupController = require('../controllers/group');
const authJwt = require('../middleware/authJwt');
const router = express.Router();

router.get('/', groupController.getGroups);


router.get(
    '/:groupId',
    authJwt.verifyToken,
    groupController.getgroupById,
);

router.post('/', authJwt.verifyToken, groupController.upsertGroup);

router.delete(
    '/:groupId',
    authJwt.verifyToken,
    groupController.deleteGroup,
);

module.exports = router;
