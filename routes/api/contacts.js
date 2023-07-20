const express = require('express');

// const contacts = require('../../models/contacts');


const ctrl = require('../../controllers/contacts');

const { validateBody, isValidId } = require('../../middlewares');
const schema = require('../../schemas/contactSchema');

const router = express.Router();


router.get('/', ctrl.getAll);

router.get('/:contactId', isValidId, ctrl.getById);

router.post('/', validateBody(schema.contactSchema), ctrl.addContact);

router.put('/:contactId', isValidId, validateBody(schema.contactSchema), ctrl.updateById);

router.patch('/:contactId/favorite', isValidId, validateBody(schema.updateFavoriteSchema), ctrl.updateFavorite);

router.delete('/:contactId', isValidId, ctrl.deleteById);

module.exports = router;
