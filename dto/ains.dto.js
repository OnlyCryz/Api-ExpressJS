const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string();
const arains = Joi.number().integer();

const createAinsDto = Joi.object({
  name: name.required(),
  arains: arains.required(),
});

const updateAinsDto = Joi.object({
  name: name.required(),
  arains: arains.required(),
});

const getAinsDto = Joi.object({
  id: id.required(),
});

module.exports = { createAinsDto, updateAinsDto, getAinsDto };
