/**
 * @swagger
 * components:
 *  schemas:
 *    Commercial:
 *      type: object
 *      required:
 *        - title
 *        - author
 *        - finished
 *      properties:
 *        id:
 *          type: integer
 *          description: The auto-generated id of the commercial.
 *        title:
 *          type: string
 *          description: The title of your commercial.
 *        author:
 *          type: string
 *          description: Who wrote the commercial?
 *        finished:
 *          type: boolean
 *          description: Have you finished reading it?
 *        createdAt:
 *          type: string
 *          format: date
 *          description: The date of the record creation.
 *      example:
 *         title: The Pragmatic Programmer
 *         author: Andy Hunt / Dave Thomas
 *         finished: true
 */
/**
 * @swagger
 * tags:
 *  name: Commercials
 *  description: API to manage your commercials.
 */
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
