const { Schema, model } = require('mongoose');
const Joi = require("joi");

const { handleMaongooseError, handleUpdateValidate } = require('../helpers');


const contactSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    }
}, { versionKey: false, timestamps: true });



contactSchema.pre("findOneAndUpdate", handleUpdateValidate);

contactSchema.post("save", handleMaongooseError); // прослойка если будет ошибка сработает ,чинит 500 ошибку хоть она 400 
contactSchema.post("findOneAndUpdate", handleMaongooseError)

const addSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().required(),
	phone: Joi.string().required(),
	favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({   // схема для id/favorite
	favorite: Joi.boolean().required(),
});

const schemas = {
    addSchema,
    updateFavoriteSchema,
}

const Contact = model('contact', contactSchema);

module.exports = {
    Contact,
    schemas,
};