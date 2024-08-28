
const postService = require("../services/post-service");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Post = require("../models/post");

exports.getUserPosts = catchAsync(async (req, res, next) => {

    const userId = req.params.id;

    const posts = await postService.getUserPosts(userId);
    res.status(200).json({
        success: true,
        data: {posts}
    })
})

exports.getPostById = catchAsync(async (req, res, next) => {
    const postId = req.params.id;
    const post = await postService.getPost(postId);
    res.status(200).json({
        success: true,
        data: {post}
    })
})


exports.createPost = catchAsync(async (req, res, next) => {
    const newPost = {description} =req.body
    const user = req.user;
   //get files from multer
    const files = req.files

    const post = await postService.createPost(user ,newPost,files);

    res.status(200).json({
        success: true,
        data: {post}
    })
})

exports.deletePost = catchAsync(async (req, res, next) => {
    const postId = req.params.id;
    const user = req.user;
    const post = await postService.deletePost(user, postId);
    res.status(200).json({
        success: true,
        data: {post}
    })
})