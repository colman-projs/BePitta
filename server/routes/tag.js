const express = require('express');
const tagController = require('../controllers/tag');
const authJwt = require('../middleware/authJwt');
const router = express.Router();

router.get('/', tagController.getTags);

router.get('/:dishId', authJwt.verifyToken, tagController.getTagById);

router.post('/', authJwt.verifyToken, tagController.upsertTag);

router.delete('/:dishId', authJwt.verifyToken, tagController.deleteTag);

module.exports = router;
