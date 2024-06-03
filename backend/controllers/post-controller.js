const Post = require("../models/post");
const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");


exports.post = catchAsync(async (req, res, next) => {
    const {description} = req.body;
    const file = req.file;
    res.send(file);
    console.log(file);
    if(!file) return next(new AppError('Please upload a file', 400));
    const mediaPath = 'xx';
    const post = await Post.create({
        description,
        mediaPath,
        user: req.user.id
    });
    res.status(201).json({
        message: "Post created",
        code:"POST_CREATED",
        data: {
            post
        }
    });
})
