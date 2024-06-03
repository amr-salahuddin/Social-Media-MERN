/* FILE STORAGE */
const {v4: uuidv4} = require("uuid");
const multer = require("multer");
const userStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/user_pictures");
    },
    filename: function (req, file, cb) {
        const fileName = uuidv4() + file.originalname;
        cb(null, fileName);
    },
});
exports.uploadUserPicture = multer({storage :userStorage});

const postStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(__dirname)
        cb(null, __dirname + "/public/assets");
    },
    filename: function (req, file, cb) {
        // const fileName = uuidv4() + file.originalname;
        console.log('hi');
        cb(null, file.originalname);
    },
});
exports.uploadPostMedia = multer({storage:postStorage});
