const { Contact } = require('../models/contact');

const { HttpError } = require('../helpers/');
const { ctrlWrapper } = require('../helpers/');

const getAll = async (req, res) => {
    const { _id: owner } = req.user;
    const { page = 1, limit = 10 } = req.query; // пагинация
    const skip = (page - 1) * limit;

    const result = await Contact.find({ owner }, '-createdAt -updatedAt', { skip, limit }).populate("owner", "name email");  // {owner} возвращает не все фильмы а только те что добавил user

    
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
    const { _id: owner } = req.user;

    const result = await Contact.create({...req.body, owner});

    
    res.status(201).json(result);
};

const updateById = async (req, res) => {
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