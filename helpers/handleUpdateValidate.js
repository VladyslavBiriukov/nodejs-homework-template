const handleUpdateValidate = function (next) {   // при обновлении тела проверяет правильно заполнение поля
    this.options.runValidators = true;
    next();
} 

module.exports = handleUpdateValidate;