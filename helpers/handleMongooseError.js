const handleMaongooseError = (error, data, next) => {
    const { name, code } = error;
    const status = (name === "MongoServerError" && code === 11000) ? 409 : 400;
    error.status = status;
    next();
}; // прослойка если будет ошибка сработает ,чинит 500 ошибку хоть она 400 

module.exports = handleMaongooseError;