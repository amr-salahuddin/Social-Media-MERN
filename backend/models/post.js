const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    mediaPath: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    //0 none 1 like 2 love 3 haha 4 angry 5 sad
    likes:
        {
            type: Map,
            of: Number
        }
    ,
    likesCount: {
        type: [Number],
        default: []
    },
    reactionCount:{
        type: Number,
        default: 6
    },
    comments: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }],
        default: []
    }
    , shares: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        default: []
    },
    deleted: {
        type: Boolean,
        default: false
    }
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
