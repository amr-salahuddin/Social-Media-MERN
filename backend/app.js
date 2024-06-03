const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const multer = require("multer");
const authRoute = require("./Routes/auth-route");
const userRoute = require("./Routes/user-route");
const postRoute = require("./Routes/post-route");
dotenv.config({ path: "./config.env" });


const app = express();

if (process.env.NODE_ENV !== "production")
    app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/public', express.static('public'));

//region Routes
app.use('/api/v1/auth/' , authRoute);
app.use('/api/v1/user/' , userRoute);
app.use('/api/v1/post/' , postRoute);


/* FILE STORAGE */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        console.log('hi');

        cb(null, file.originalname);
    },
});
const upload = multer({ storage });


app.post ('/upload', upload.single('sad'), function (req, res, next){

    const file = req.file;
    res.send(file);
}  );
//endregion
app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({
        message
    });
});

module.exports = app;
