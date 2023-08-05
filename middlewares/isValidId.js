const { isValidObjectId } = require("mongoose"); // проверяет id это может быть им или нет 

const { HttpError } = require("../helpers");

const isValidId = (req, res, next) => {
    const { contactId } = req.params;
    if (!isValidObjectId(contactId)) {
        next(HttpError(400, `${contactId} is not valid ID`))
    }
    next();
}

module.exports = { isValidId };