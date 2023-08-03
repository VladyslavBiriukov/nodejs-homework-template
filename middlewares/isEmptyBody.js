const { HttpError } = require("../helpers");

const IsEmptyBody = (req, res, next) => {
    const { length } = Object.keys(req.body);
    if (!length) {
        next(HttpError(400, 'fields must be required'))
    }
    next()
}

module.exports = { IsEmptyBody };