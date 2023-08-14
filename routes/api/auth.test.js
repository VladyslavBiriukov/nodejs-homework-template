const mongoose = require('mongoose');
require("dotenv").config();

const request = require('supertest');  // http запрос на backend

const app = require('../../app');

const User = require('../../models/user');


const { DB_HOST_TEST, PORT } = process.env;

describe('test signUp route', () => {
    let server = null;
    beforeAll(async () => {
        await mongoose.connect(DB_HOST_TEST); // подкл до Базы
        server = app.listen(PORT);  // запускаем веб сервер 
    })

    afterAll(async () => {
        await mongoose.connection.close();
        server.close();
    })

    afterEach(async () => {
        await User.deleteMany({});
    });

    test('test signUp with correct data', async () => {
        const signUpData = {
            name: "TEST",
            email: "cikarep898@viperace.com",
            password: "123456Aa"
        }
        const { statusCode, body } = await request(app).post("/api/auth/register").send(signUpData);

        expect(statusCode).toBe(201);
        expect(body.name).toBe(signUpData.name);
        expect(body.email).toBe(signUpData.email);

        const user = await User.findOne({ email: signUpData.email });

        expect(user.name).toBe(signUpData.name);

    })
});


