const { Schema, model } = require('mongoose');
const Joi = require("joi");

const { handleMaongooseError } = require('../helpers');
const { subscriptionLevel, emailRegexp } = require('../constants/user-constants.js');



const userSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    password: {
        type: String,
        minlength: 5,
        required: [true, 'Set password for user'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        match: emailRegexp,
        unique: true,
    },
    subscription: {
        type: String,
        enum: subscriptionLevel,
        default: "starter"
    },
    token: {
        type: String,
        default: "",
    },
}, { versionKey: false, timestamps: true });

userSchema.post("save", handleMaongooseError);  

const User = model('user', userSchema);  // название колекциии

const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(5).required(),
});

const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(5).required(),
});

const schemas = {
    registerSchema,
    loginSchema,
};

module.exports = {
    User,
    schemas,
};