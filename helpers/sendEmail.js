const sendgridMail = require('@sendgrid/mail');
require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;

sendgridMail.setApiKey(SENDGRID_API_KEY);


const sendEmail = async (data) => {
    const email = { ...data, from: "gamebsquirreld@gmail.com" };
    await sendgridMail.send(email);
    return true;
}
// const email = {
//     to: "faxeh28907@weishu8.com",
//     from: "gamebsquirreld@gmail.com",
//     subject: "TEST",
//     html: "<h1>HI</h1>",
// }

// sendgridMail.send(email)
//     .then(() => console.log("email"))
//     .catch(error => console.log(error.message));

module.exports = sendEmail;