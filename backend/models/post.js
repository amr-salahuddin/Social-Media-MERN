const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    mediaPath: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    likes: {
        type: Map,
        of: Boolean
    },
    comments:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Comment"
    },shares:{

    }
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
