const { Schema, model } = require('mongoose');
const { handleMaongooseError } = require('../helpers');

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
}, { versionKey: false, timestamps: true });

contactSchema.post("save", handleMaongooseError); // прослойка если будет ошибка сработает ,чинит 500 ошибку хоть она 400 

const Contact = model('contact', contactSchema);

module.exports = Contact;