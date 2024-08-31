const Post = require("../models/post");
const Comment = require("../models/comment");
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
            select: 'firstName lastName pictureUrl'
        }
    );
    return posts;
}

exports.createPost = async (user, post, files) => {
    const {description} = post


    const media = files;

    const newPost = new Post({
        description,
        user: user._id,
        postNumber: user.postNumber,
        media
    });

    user.postNumber += 1;

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

exports.likePost = async (user, postId, type) => {

    //check if user already liked

    console.log('typ', type);
    if (type == 0) {
        console.log('pull')
        const post = await Post.findOneAndUpdate(
            {_id: postId},
            {
                $pull: {likes: {user: user._id}}
            },
            {new: true}
        )
        user.likedPosts.pull(post._id);
        await user.save();
        if (!post) {
            throw new AppError('Post not found or Not authorized', 404)
        }
        return post;
    }
    const post = await Post.findOneAndUpdate(
        {_id: postId},
        {
            $push: {likes: {type, user: user._id}}
        },
        {new: true}
    )

    user.likedPosts.push(post._id);
    await user.save();
    if (!post) {
        throw new AppError('Post not found or Not authorized', 404)
    }
    return post;
}


exports.comment = async (user, postId, comment, files) => {


    const newComment = new Comment({
        user: user._id,
        post: postId,
        comment,
        media: files

    });
    await newComment.save();

    const post = await Post.findOneAndUpdate(
        {_id: postId},
        {$push: {comments: newComment._id}},
        {new: true}
    )

    if (!post) {
        throw new AppError('Post not found or Not authorized', 404)
    }
    user.comments.push(newComment._id);
    await user.save();
    return newComment;
}

exports.uncomment = async (user, commentId) => {

    const comment = await Comment.findOneAndUpdate({
            _id: commentId,
            user: user._id
        },
        {
            deleted: true
        }
        ,
        {new: true})

    if (!comment) {
        throw new AppError('Comment not found or Not authorized', 404)
    }
    return comment;
}

exports.getComments=async (postId, page, limit)=> {

    const comments = await Comment.find({
        post: postId,
        deleted:false
    }).sort('-createdAt').skip((page - 1) * limit).limit(limit).populate(
        {
            path: 'user',
            select: 'firstName lastName pictureUrl'
        }
    );
    console.log('comments',comments)
    return comments
}