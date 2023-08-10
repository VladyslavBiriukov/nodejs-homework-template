const { User } = require('../models/user');

const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');

const gravatar = require('gravatar');  // временная ава
const path = require("path");
const fs = require("fs/promises");
const { nanoid } = require("nanoid");

const Jimp = require('jimp');

const avatarsDir = path.join(__dirname, '../', 'public', 'avatars');

const { SECRET_KEY, BASE_URL, RENDER_URL} = process.env;

const { HttpError, ctrlWrapper, sendEmail} = require('../helpers/');  // try catch 

const register = async (req, res) => { 
    const { email, password } = req.body;
    const user = await User.findOne({ email });   // проверяем если в базе
    if (user) {
        throw HttpError(409, "Email in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);  // хешируем

    const avatarURL = gravatar.url(email);

    const verificationToken = nanoid();

    const newUser = await User.create(
        {
            ...req.body,
            password: hashPassword,
            avatarURL,
            verificationToken
        });                                       // сохраняем ползывателя + хэшированый пароль 
    
    const verifyEmail = {
        to: email,
        subject: "Verify Email",
        html: `<a target="_blank" href="${BASE_URL || RENDER_URL}/api/auth/verify/${verificationToken}">Click to verify email</a>`,
    };

    await sendEmail(verifyEmail);

    res.status(201).json({
        email: newUser.email,
        name: newUser.name,
        subscription: newUser.subscription,
    });
};


const verifyEmail = async (req, res) => {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken }); // проверяем если в базе с таким токеном
    if (!user) {
        throw HttpError(401, "Email not found");
    }
    await User.findByIdAndUpdate(user._id, {
        verify: true,
        verificationToken: "",
    }); // обновляю базу если есть 
    
    res.json({
        message: "Email verify Success"
    })
}

const resendVerifyEmail = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw HttpError(401, "Email not found");
    }
    if (user.verify) {
        throw HttpError(401, "Verification has already been passed");
    }
        const verifyEmail = {
        to: email,
        subject: "Verify Email",
        html: `<a target="_blank" href="${BASE_URL || RENDER_URL}/api/auth/verify/${user.verificationToken}">Click to verify email</a>>`,
        };
    
    await sendEmail(verifyEmail);

    res.json({
        message: "email verified"
    })
}


const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw HttpError(401, "Email or password is wrong");   // проверяем если в базе
    }

    if (!user.verify) {
        throw HttpError(401, "Email not verified");
    }

    const comparePassword = await bcrypt.compare(password, user.password);  // если да проверяем пароль с тем что ввел и стем что в базе(хеш)
    if (!comparePassword) {
        throw HttpError(401, "Email or password is wrong");
    }

    const payload = {
        id: user._id,
    };

    const token = JWT.sign(payload, SECRET_KEY, { expiresIn: "23h" });

    await User.findByIdAndUpdate(user._id, { token }); // сохранеем токен в базу

    res.json({
        token
    });

}

const getCurrent = async (req, res) => {
    const { email, name } = req.user;

    res.json({
        email,
        name,
    });
}

const logout = async (req, res) => {
    const { _id } = req.user;

    await User.findByIdAndUpdate(_id, { token: ''});

    res.status(204).json({
        message: 'Logout success',
    });
}

const updateAvatar = async (req, res) => {
    const { _id } = req.user;

    const { path: tempUpload, originalname } = req.file; // берем временный путь  

    await Jimp.read(tempUpload)
    .then((avatar) => {
      return avatar
        .resize(250, 250) // resize
        .quality(60) // set JPEG quality
        .write(tempUpload); // save
    })
    .catch((err) => {
      throw err;
    });
    
    const filename = `${_id}_${originalname}`; // делаем имя файла уникальным 
    const resultUpload = path.join(avatarsDir, filename); // создаем где должен быть файл
    await fs.rename(tempUpload, resultUpload); // перемешаем из врем папки в паблик
    const avatarURL = path.join('avatars', filename);  // записываем в базу
    await User.findByIdAndUpdate(_id, { avatarURL }); // перезаписуем аватар

    res.json({
        avatarURL,
    });
    
    // const filedata = await cloudinary.uploader.upload(tempUpload, {
    //     folder: "avatars"
    // })
    // console.log(filedata);
}



module.exports = {
    register: ctrlWrapper(register),
    verifyEmail: ctrlWrapper(verifyEmail),
    resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    updateAvatar: ctrlWrapper(updateAvatar),
}



