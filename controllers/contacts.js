// const Joi = require('joi');

const contacts = require('../models/contacts');

const { HttpError } = require('../helpers/');
const { ctrlWrapper } = require('../helpers/');


// const addSchema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().required(),
//   phone: Joi.string().required(),
// });                               // проверка тела запроса


const getAll = async (req, res) => {
        const result = await contacts.listContacts();
        res.json(result);
};

const getById = async (req, res) => {
        const { contactId } = req.params;
        const result = await contacts.getContactById(contactId);
        if (!result) {
            throw HttpError(404, 'Not Found');
        }
    
        res.json(result);
};

const addContact = async (req, res) => {
    // const { error } = addSchema.validate(req.body);   // в error будет unerfind если проверка пройдена успешно
    // if (error) {
    //     throw HttpError(400, error.message);    // проверка тела 
    // }
    const result = await contacts.addContact(req.body);
    
    res.status(201).json(result);
};

const updateById = async (req, res) => {
        // const { error } = addSchema.validate(req.body);   // в error будет unerfind если проверка пройдена успешно
        // if (error) {
        //     throw HttpError(400, error.message);    // проверка тела 
        // }
        const { contactId } = req.params;
        const result = await contacts.updateContact(contactId, req.body);
        if (!result) {
            throw HttpError(404, 'Not Found');
        }
    
        res.json(result);
};

const deleteById = async (req, res) => {
        const { contactId } = req.params;
        const result = await contacts.removeContact(contactId, req.body);
        if (!result) {
            throw HttpError(404, 'Not Found');
        }
    
        res.json({
            message: "contact deleted"
        });
};

module.exports = {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    addContact: ctrlWrapper(addContact),
    updateById: ctrlWrapper(updateById),
    deleteById: ctrlWrapper(deleteById),
}