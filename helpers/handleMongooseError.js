const handleMaongooseError = (error, data, next) => {
    error.status = 400;
    next();
}; // прослойка если будет ошибка сработает ,чинит 500 ошибку хоть она 400 

module.exports = handleMaongooseError;