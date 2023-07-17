const express = require('express');
// const Joi = require('joi');

// const contacts = require('../../models/contacts');
// const { HttpError } = require('../../helpers/');

const ctrl = require('../../controllers/contacts');

const { validateBody } = require('../../middlewares');
const schema = require('../../schemas/contactSchema');

const router = express.Router();

// const addSchema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().required(),
//   phone: Joi.string().required(),
// });                                   

router.get('/', ctrl.getAll);

router.get('/:contactId', ctrl.getById);

router.post('/', validateBody(schema.contactSchema), ctrl.addContact);

router.put('/:contactId', validateBody(schema.contactSchema), ctrl.updateById);

router.delete('/:contactId', ctrl.deleteById);

module.exports = router;
