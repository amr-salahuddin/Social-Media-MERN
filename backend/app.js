const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const errorHandler= require("./controllers/error-controller");
const userRoute = require('./routes/user-route');
const authRoute = require('./routes/auth-route');
const postRoute = require('./routes/post-route');
const multer = require("multer");

const uuidv4 = require('uuid').v4
const app = express();

if (process.env.NODE_ENV !== "production")
    app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `public/assets/`);
    },
    filename: (req, file, cb) => {
        cb(null, ` ${uuidv4()}-${file.originalname}`);
    }

});
const upload = multer({storage});
app.post('/api/v1/upload', upload.any('file'), (req, res) => {
    res.status(200).json({
        success: true,
        message: 'File uploaded successfully'
    })
})
app.use('/public', express.static('public'));

//region routes

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/user', userRoute);
app.use('/api/v1/post',postRoute)
// app.use('/api/comment', require('./routes/comment-route'));

//endregion
app.use(errorHandler)
module.exports = app;
