const express = require('express');

// const contacts = require('../../models/contacts');


const ctrl = require('../../controllers/contacts');

const { validateBody, isValidId } = require('../../middlewares');
const { schemas } = require('../../models/contact');

const router = express.Router();


router.get('/', ctrl.getAll);

router.get('/:contactId', isValidId, ctrl.getById);

router.post('/', validateBody(schemas.addSchema), ctrl.addContact);

router.put('/:contactId', isValidId, validateBody(schemas.addSchema), ctrl.updateById);

router.patch('/:contactId/favorite', isValidId, validateBody(schemas.updateFavoriteSchema), ctrl.updateFavorite);

router.delete('/:contactId', isValidId, ctrl.deleteById);

module.exports = router;
