const express = require('express');
const AinsService = require('./../services/ains.service');
const validatorHandler = require('./../middleware/validator.handler');
const {
  createAinsDto,
  updateAinsDto,
  getAinsDto,
} = require('./../dto/ains.dto');

const router = express.Router();
const service = new AinsService();

/**
 * @swagger
 * /api/v1/ains:
 *  get:
 *    description: Consultar todos los Ains
 *    responses:
 *      '200':
 *        description: Respuesta exitosa
 */
router.get('/', async (req, res) => {
  res.status(200).json(await service.find());
});

/**
 * @swagger
 * /api/v1/ains/{id}:
 *  get:
 *    summary: Consultar Ains
 *    parameters:
 *      - in: path
 *        name: id
 *    responses:
 *      '200':
 *        description: Respuesta exitosa
 *      '400':
 *        description: Solicitud incorrecta
 *      '404':
 *        description: Ains no encontrado
 */
router.get(
  '/:id',
  validatorHandler(getAinsDto, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const ains = await service.findOne(parseInt(id));
      res.json(ains);
    } catch (err) {
      next(err);
    }
  }
);

/**
 * @swagger
 * /api/v1/ains:
 *  post:
 *    summary: Consultar un Ains
 *    parameters:
 *      - in: body
 *        name: ad info
 *    responses:
 *      '201':
 *        description: Creacion exitosa
 *      '400':
 *        description: Solicitud incorrecta
 */
router.post('/', validatorHandler(createAinsDto, 'body'), async (req, res) => {
  const body = req.body;
  const newAins = await service.create(body);
  res.status(201).json(newAins);
});

/**
 * @swagger
 * /api/v1/ains/{id}:
 *  patch:
 *    summary: Editar Ains
 *    parameters:
 *      - in: path
 *        name: id
 *      - in: body
 *        name: ad info
 *    responses:
 *      '200':
 *        description: Respuesta exitosa
 *      '400':
 *        description: Solicitud incorrecta
 *      '404':
 *        description: Ains no encontrado
 */
router.patch(
  '/:id',
  validatorHandler(getAinsDto, 'params'),
  validatorHandler(updateAinsDto, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const ains = await service.update(parseInt(id), body);
      res.json(ains);
    } catch (err) {
      next(err);
    }
  }
);

/**
 * @swagger
 * /api/v1/ains/{id}:
 *  delete:
 *    summary: Eliminar Ains
 *    parameters:
 *      - in: path
 *        name: id
 *    responses:
 *      '200':
 *        description: Respuesta exitosa
 *      '400':
 *        description: Solicitud incorrecta
 *      '404':
 *        description: Ains no encontrado
 */
router.delete(
  '/:id',
  validatorHandler(getAinsDto, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const ains = await service.delete(parseInt(id));
      res.json(ains);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
