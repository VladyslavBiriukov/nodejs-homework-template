const express = require('express');

const ctrl = require("../../controllers/auth");

const { validateBody, authenticate, upload } = require('../../middlewares');
const { schemas } = require('../../models/user');

const router = express.Router();


// signUp
router.post('/register', validateBody(schemas.registerSchema), ctrl.register);

router.get('/verify:verificationToken', ctrl.verifyEmail);

router.post('/verify', validateBody(schemas.emailVerifySchema), ctrl.resendVerifyEmail)

// signIn
router.post('/login', validateBody(schemas.loginSchema), ctrl.login);

router.get('/current', authenticate, ctrl.getCurrent);

// logOut

router.post('/logout', authenticate, ctrl.logout);

// avatar 

router.patch('/avatars', authenticate, upload.single('avatar'), ctrl.updateAvatar); // если много файло то array("названик", 8-кол фай) fields - файли в нескольких полях запроса

module.exports = router;