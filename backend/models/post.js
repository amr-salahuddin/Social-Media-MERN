const mongoose = require("mongoose");

let Reactions = {
    NONE: 0,
    LIKE: 1,
    LOVE: 2,
    HAHA: 3,
    ANGRY: 4,
    SAD: 5
}
const postSchema = new mongoose.Schema({
    content: {
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
            enum: Object.values(Reactions),
            of: Number,
            default: {}
        }
    ,
    likesCount:
        {
            type: Map,
            enum: Object.values(Reactions),
            of: Number,
            default: {}
        },
    reactionsCount: {
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
