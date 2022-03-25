const express = require('express');
const adminController = require('../controllers/admin');
const clientController = require('../controllers/client');
const authJwt = require('../middleware/authJwt');
const router = express.Router();

router.post('/', adminController.authenticate);
router.post('/update', authJwt.verifyToken, adminController.updateDetails);
router.get('/clients', clientController.getClients);

module.exports = router;
