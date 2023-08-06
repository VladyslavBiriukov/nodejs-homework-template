const multer = require("multer"); // извлекает файл из тела запроса и добовляет во врем папку и дальше в req.file записует 
const path = require("path");


const tempDir = path.join(__dirname, "../", "temp"); // путь для временной папки
// const destination = path.resolve("temp") // es6

const multerConfig = multer.diskStorage({
    destination: tempDir,
    filename: (req, file, cb) => {     // новое имя файла
        const { originalname } = file;
        const uniquePrefix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        const filename = `${uniquePrefix}_${originalname}`;
        cb(null, filename);
    }
});

const limits = {
    fileSize: 1024 * 1024 * 5,
};

const upload = multer({
    storage: multerConfig,
    limits,
});

module.exports = upload;

