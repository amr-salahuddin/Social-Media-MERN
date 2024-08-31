const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
    },
    media:{
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
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    post:{
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