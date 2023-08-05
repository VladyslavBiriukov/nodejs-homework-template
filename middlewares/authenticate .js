const JWT = require("jsonwebtoken");

const { User } = require("../models/user");

const { HttpError } = require("../helpers");

const { SECRET_KEY } = process.env;


const authenticate = async (req, res, next) => {
    const { authorization = "" } = req.headers; // ="" шоб не было ошибки если вернет under..
    const [bearer, token] = authorization.split(" "); // разделяем 2 слова из заголовка авторизации
    if (bearer !== "Bearer") {
        next(HttpError(401));
    }
    try {
        const { id } = JWT.verify(token, SECRET_KEY);
        const user = await User.findById(id); // проверяем если ли человек в базе 

        if (!user || !user.token || user.token !== token) {
            console.log(user.token , 'token:', token)
            next(HttpError(401));
        }
        req.user = user;
        next();
    } catch (error) {
        next(HttpError(401));  // если приходет токен который не мы шифровали то он переходит в catch
    }
}

module.exports = { authenticate };

