const multer = require("multer");
const {v4: uuidv4} = require('uuid');
const fs = require('fs');
const path = require('path');

// Function to create directories if they don't exist
const ensureDirectoryExists = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, {recursive: true});
    }
};
const profilePictureStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const userId = req.user._id;
        ensureDirectoryExists(`./public/${userId}`);
        cb(null, `public/${userId}`);

    },
    filename: (req, file, cb) => {
        const userId = req.user._id;
        cb(null, ` ${uuidv4()}-${file.originalname}`);
    }
})

module.exports = profilePictureStorage


const postMediaStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const userId = req.user._id;
        const postNumber = req.user.postNumber;
        const dir = `./public/post_media/${userId}/${postNumber}`

        ensureDirectoryExists(dir);
        cb(null, `public/post_media/${userId}/${postNumber}/`);
    },
    filename: (req, file, cb) => {
        const postNumber = req.user.postNumber;
        cb(null, `${uuidv4()}-${postNumber}-${file.originalname}`);
    }
})

module.exports = multer({storage: postMediaStorage});