const express = require('express');
const commercialController = require('../controllers/commercial');
const authJwt = require('../middleware/authJwt');
const router = express.Router();

router.get('/', commercialController.getCommercials);

router.get('/:screenId(\\d+)', commercialController.getCommercialsByScreenId);

router.get(
    '/:commercialId',
    authJwt.verifyToken,
    commercialController.getCommercialById,
);

router.post('/', authJwt.verifyToken, commercialController.upsertCommercial);

router.delete(
    '/:commercialId',
    authJwt.verifyToken,
    commercialController.deleteCommercial,
);

module.exports = router;
