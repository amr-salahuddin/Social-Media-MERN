const Post = require("../models/post");
const AppError = require("../utils/appError");

exports.getPost = async (postId) => {
    const post = await Post.findById(postId);
    if (!post) {
        throw new AppError('Post not found', 404)
    }
    return post;
}

exports.getUserPosts = async (userId, page, limit) => {
    page = page || 1;
    limit = limit || 10;
    const posts = await Post.find({
        user: userId,
        deleted: false
    }).sort('-createdAt').skip((page - 1) * limit).limit(limit).populate(
        {
            path: 'user',
            select: 'firstName lastName imageUrl'
        }
    );
    return posts;
}

exports.createPost = async (user, post,files) => {
    const {description} = post


    const media =files;

    const newPost = new Post({
        description,
        user: user._id,
        media
    });


    user.posts.push(newPost._id);
    await user.save();
    await newPost.save();
    return newPost;
}

exports.deletePost = async (user, postId) => {


    const post = await Post.findOneAndUpdate(
        {_id: postId, user: user._id,},
        {deleted: true},
        {new: true}
    )

    if (!post) {
        throw new AppError('Post not found or Not authorized', 404)
    }
    return post;
}
