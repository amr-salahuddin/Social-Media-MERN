const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const catchAsync = require("../utils/catchAsync");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        min:2,
        max:50,

    },
    lastName: {
        type: String,
        required: true,
        min:2,
        max:50
    },
    username: {
        type: String,
        min:2,
        max:50
    },
    email: {
        type: String,
        required: true,
        max:50
    },
    password: {
        type: String,
        required: true,
        min:5
    }, passwordConfirm: {
        type: String,
        required: true,
        min:5,
        select : false,

        validate: {
            validator: function (el) {
                return el === this.password;
            },
            message: "Passwords are not same"
        }
    },
    friends:{
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
    },
    likedPosts:{
        type:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Post"
            }
        ]
    },
    friendRequests:{
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
    },
    picturePath:{
        type: String,
        default: ""
    },
    location:String,
    occupation:String,
    viewedProfile:Number,
    impressions:Number
});

//pre

userSchema.pre("save", async function (next) {
    if(!this.isModified('password')){
        return next();
    }
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm  = undefined;
    next();
})
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
