const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },
    pictureUrl: {
        type: String
    },
    bannerUrl: {
        type: String
    },
    username: {
        type: String,
        required: true,
        unique: true,
        index: true,

    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true,

    },
    password: {
        type: String,
        required: true,
        select: false
    }, passwordConfirm: {
        type: String,
        required: true,
        select: false,
        validate: {
            validator: function (el) {
                return el === this.password;
            },
            message: "Passwords do not match"
        }
    },
    passwordChangedAt: {
        type: Date,
    },
    phoneNumber: {
        type: String,
    },
    location: {
        type: String,
    },
    occupation: {
        type: String,
    },
    deleted: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastLogin: {
        type: Date,
        default: Date.now
    },
    status: {
        type: Number,
        default: 0
    },
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    friendRequests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    sentFriendRequests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    blocked: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }],
    postNumber:{
        type: Number,
        default:0
    },
    likedPosts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }],
    reportsIssued: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Report"
    }],
    reportsReceived: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Report"
    }],


})

userSchema.indexes({email: 1, username: 1}, {unique: true});
//pre save
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
});


userSchema.pre("save", async function (next) {
    if (!this.isModified("password") && !this.isNew) return next();
    this.passwordChangedAt = Date.now() - 1000;
    next();
})

userSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

module.exports = mongoose.model("User", userSchema)