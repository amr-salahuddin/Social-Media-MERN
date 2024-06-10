const Post = require("../models/post");
const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const mongoose = require("mongoose");


exports.post = catchAsync(async (req, res, next) => {
    const {content} = req.body;
    const post = await Post.create({
        content,
        user: req.user.id
    });
    req.user.posts.push(post);
    await req.user.save();
    res.status(201).json({
        message: "Post created",
        code: "POST_CREATED",
        data: {
            post
        }
    });
})

exports.getUserPosts = catchAsync(async (req, res, next) => {
    const posts = await Post.find({user: req.params.id, deleted: false});
    res.status(201).json({
        message: "OK",
        data: {
            posts
        }
    });
})


exports.deletePost = catchAsync(async (req, res, next) => {

    const user = req.user;
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) {
        return next(new AppError("Post not found", 404));
    }
    console.log(post.user, user.id);
    if (post.user != user.id) {
        return next(new AppError("You can only delete your own posts", 401));
    }


    post.deleted = true;

    await post.save();
    console.log(post);
    res.status(201).json({
        message: "Post deleted",
        code: "POST_DELETED",
        data: {
            post
        }
    });
})

exports.getPost = catchAsync(async (req, res, next) => {

    //find post by id while returns comments number not comments array
    const post = await Post.aggregate([
        {
            $match: {_id: new mongoose.Types.ObjectId(req.params.id)} // Match the post by its ID
        },
        {
            $project: {
                content: 1,
                mediaPath: 1,
                user: 1,
                likesCount: 1,
                reachCount: 1,

                commentsCount: {$size: "$comments"},
            }
        }
    ]);

    await Post.populate(post, {
        path: "user",
        select: "firstName lastName picture"
    });
    console.log(post);
    if (!post) {
        return next(new AppError("Post not found", 404));
    }
    res.status(201).json({
        message: "OK",
        data: {
            post
        }
    });
})


exports.getPostLikers = catchAsync(async (req, res, next) => {
    const post = await Post.aggregate(
        [
            {
                $match: {_id: new mongoose.Types.ObjectId(req.params.id)} // Match the post by its ID
            },
            {
                $project: {
                    likes: 1,
                    likesCount: 1,
                    reactionsCount: 1
                }
            }
        ]
    )
    await Post.populate(post, {
        path: "likes",
        select: "firstName lastName picture"
    })
    if (!post) {
        return next(new AppError("Post not found", 404));
    }
    res.status(201).json({
        message: "OK",
        data: {
            likers: post.likes,
        }
    });
})

exports.likePost = catchAsync(async (req, res, next) => {
    const user = req.user;
    const reaction = req.body.reaction;

    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) {
        return next(new AppError("Post not found", 404));
    }
    console.log(post);
    const currentReaction = post.likes.get(user.id) || 0;
    if (currentReaction === reaction) {
        res.status(201).json({
            message: "Same Reaction",
            code: "POST_LIKE_SAME_REACTION",
            data: {
                post
            }
        })
    }
    if (currentReaction != 0)
        post.likesCount[currentReaction]--;

    if (reaction != 0)
        post.likesCount[reaction]++;
    if (currentReaction == 0 && reaction != 0) {
        post.likesCount[post.reactionsCount]++;
    }
    post.likes.set(user.id, reaction);
    await post.save();
    res.status(201).json({
        message: "Post liked",
        code: "POST_LIKED",
        data: {
            post
        }
    });
})

exports.commentPost = catchAsync(async (req, res, next) => {
    const user = req.user;
    const postId = req.params.id;
    const comment = req.body.comment;

    //check if post exists and not deleted using aggregate
    const post = await Post.aggregate({


    })
    if (!post) {
        return next(new AppError("Post not found", 404));
    }

})
