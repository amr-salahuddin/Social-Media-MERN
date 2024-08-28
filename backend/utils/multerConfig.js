const multer = require("multer");
const {v4: uuidv4} = require('uuid');
const profilePictureStorage = (userId) => {
    return multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, `public/profilePictures/${userId}`);
        },
        filename: (req, file, cb) => {
            cb(null, ` ${userId}-${file.originalname}`);
        }

    })
}

module.exports = profilePictureStorage


const postMediaStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `public/post_media/`);
    },
    filename: (req, file, cb) => {
        cb(null, `${uuidv4()}-${file.originalname}`);
    }
})

module.exports = multer({storage: postMediaStorage});