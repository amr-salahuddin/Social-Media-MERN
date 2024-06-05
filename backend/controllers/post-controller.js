const Post = require("../models/post");
const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const mongoose = require("mongoose");


exports.post = catchAsync(async (req, res, next) => {
    const {description} = req.body;
    const post = await Post.create({
        description,
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
                description: 1,
                mediaPath: 1,
                user: 1,

                commentsCount: {$size: "$comments"},
                likesCount: {$size: "$likes"}
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
                    likes: 1
                }
            }
        ]
    )
    if (!post) {
        return next(new AppError("Post not found", 404));
    }
    res.status(201).json({
        message: "OK",
        data: {
            likers: post.likes,
            likersCount: post.likes.length
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
    const currentReaction = post.likes[user.id];

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
        post.likesCount[currentReaction] = post.likesCount[currentReaction] - 1;

    if (reaction != 0)
        post.likesCount[reaction] = post.likesCount[reaction] + 1;
    if (currentReaction == 0 && reaction != 0) {
        post.likesCount[post.reactionCount]++;
    }
    post.likes[user.id] = reaction;
    await post.save();
    res.status(201).json({
        message: "Post liked",
        code: "POST_LIKED",
        data: {
            post
        }
    });
})
