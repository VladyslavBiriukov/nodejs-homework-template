// const Joi = require('joi');

// const contacts = require('../models/contacts');

// const {  HttpError } = require('../helpers/');


// const addSchema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().required(),
//   phone: Joi.string().required(),
// });                               // проверка тела запроса


// const getAll = async (req, res, next) => {
//     try {
//         const result = await contacts.listContacts();
//         res.json(result);
    
//     } catch (error) {
//         // res.status(500).json({
//         //   message: 'Server Error',
//         // }) 
//         next(error);
//     }
// };

// const getById = async (req, res, next) => {
//     try {
//         const { contactId } = req.params;
//         const result = await contacts.getContactById(contactId);
//         if (!result) {
//             throw HttpError(404, 'Not Found');
//             // return res.status(404).json({
//             //   message: 'Not Found'
//             // })
//             // const error = new Error('Not Found');
//             // error.status = 404;
//             // throw error;
//         }
//         res.json(result);
    
//     } catch (error) {
//         // const { status = 500, message = 'Server Error' } = error;
//         // res.status(status).json({
//         //   message: message,
//         // })
//         next(error);
//     }
// };

// const addContact = async (req, res, next) => {
//     try {
//         const { error } = addSchema.validate(req.body);   // в error будет unerfind если проверка пройдена успешно
//         if (error) {
//             throw HttpError(400, error.message);    // проверка тела 
//         }
//         const result = await contacts.addContact(req.body);
//         res.status(201).json(result);
    
//     } catch (error) {
//         next(error);
//     }
// };

// const updateById = async (req, res, next) => {
//     try {
//         const { error } = addSchema.validate(req.body);   // в error будет unerfind если проверка пройдена успешно
//         if (error) {
//             throw HttpError(400, error.message);    // проверка тела 
//         }
//         const { contactId } = req.params;
//         const result = await contacts.updateContact(contactId, req.body);
//         if (!result) {
//             throw HttpError(404, 'Not Found');
//         }
//         res.json(result);
    
//     } catch (error) {
//         next(error);
//     }
// };

// const deleteById = async (req, res, next) => {
//     try {
//         const { contactId } = req.params;
//         const result = await contacts.removeContact(contactId, req.body);
//         if (!result) {
//             throw HttpError(404, 'Not Found');
//         }
//         res.json({
//             message: "contact deleted"
//         });
//     } catch (error) {
//         next(error);
//     }
// };

// module.exports = {
//     getAll,
//     getById,
//     addContact,
//     updateById,
//     deleteById,
// }