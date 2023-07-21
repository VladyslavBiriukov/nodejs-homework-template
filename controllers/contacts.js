const { Contact } = require('../models/contact');

const { HttpError } = require('../helpers/');
const { ctrlWrapper } = require('../helpers/');

const getAll = async (req, res) => {
        const result = await Contact.find();
        res.json(result);
};

const getById = async (req, res) => {
        const { contactId } = req.params;
        const result = await Contact.findById(contactId);
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
    const result = await Contact.create(req.body);
    
    res.status(201).json(result);
};

const updateById = async (req, res) => {
        // const { error } = addSchema.validate(req.body);   // в error будет unerfind если проверка пройдена успешно
        // if (error) {
        //     throw HttpError(400, error.message);    // проверка тела 
        // }
        const { contactId } = req.params;
        const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
        if (!result) {
            throw HttpError(404, 'Not Found');
        }
    
        res.json(result);
};


const updateFavorite = async (req, res) => {
        const { contactId } = req.params;
        const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
        if (!result) {
            throw HttpError(404, 'Not Found');
        }
    
        res.json(result);
};

const deleteById = async (req, res) => {
        const { contactId } = req.params;
        const result = await Contact.findByIdAndDelete(contactId, req.body);
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
    updateFavorite: ctrlWrapper(updateFavorite),
    deleteById: ctrlWrapper(deleteById),
}