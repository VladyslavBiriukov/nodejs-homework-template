const { User } = require("../models/user");

const bcrypt = require('bcryptjs');
const JWT = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const { HttpError, ctrlWrapper } = require('../helpers/');

const register = async (req, res) => { 
    const { email, password } = req.body;
    const user = await User.findOne({ email });   // проверяем если в базе
    if (user) {
        throw HttpError(409, "Email in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);  // хешируем

    const newUser = await User.create(
        {
            ...req.body,
            password: hashPassword
        });                                       // сохраняем ползывателя + хэшированый пароль 

    res.status(201).json({
        email: newUser.email,
        name: newUser.name,
    });
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw HttpError(401, "Email or password is wrong");   // проверяем если в базе
    }

    const comparePassword = await bcrypt.compare(password, user.password);  // если да проверяем пароль с тем что ввел и стем что в базе(хеш)
    if(!comparePassword) {
            throw HttpError(401, "Email or password is wrong");
    }

    const payload = {
        id: user._id,
    };

    const token = JWT.sign(payload, SECRET_KEY, { expiresIn: "23h" });

    res.json({
        token
    });

}

module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
}



