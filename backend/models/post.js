const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
    type: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }

})


const postSchema = new mongoose.Schema({

    description: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    },
    postNumber:{
        type: Number,
        default:0
    },
    media: {
        type: Array,
        default: [],
    },
    deleted: {
        type: Boolean,
        default: false
    },
    likes: {
        type: Array,
        default: []
    },
    likesCount: {
        type: Map,
        of: Number
    },
    shares: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }],
    reportsReceived: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Report"
    }],

})

postSchema.index({createdAt: -1});

//make createdAt = date.now pre save

postSchema.pre("save", function (next) {

    if (this.isNew) {
        this.createdAt = Date.now()
    }
    else
        this.updatedAt = Date.now()
    next();
})

postSchema.pre('updateOne', function (next) {
    this.set({updatedAt: Date.now()})
    next()
})

postSchema.pre('findOneAndUpdate', function (next) {
    this.set({updatedAt: Date.now()})
    next()
})

module.exports = mongoose.model("Post", postSchema)