const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    mediaUrl:{
        type:Array,
        default: []
    },
    deleted:{
        type: Boolean,
        default: false
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    avatar:{
        type: String,
        required: true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    postId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    },

    reportsReceived:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Report"
    }],


})


commentSchema.index({ createdAt: -1 });
module.exports = mongoose.model("Comment", commentSchema)