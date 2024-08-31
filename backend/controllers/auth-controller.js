const User = require('../models/user');
const userService = require('../services/user-service');
const catchAsync = require('../utils/catchAsync');
const AppError = require("../utils/appError");
const {tokenize} = require("../utils/tokenization");


exports.register = catchAsync(async (req, res, next) => {

    const file = req.file;
    const userData = {
        firstName,
        lastName,
        email,
        password,
        passwordConfirm,
        phoneNumber,
        location,
        occupation
    } = req.body;
    if (password !== passwordConfirm) {
        return next(new AppError('Passwords do not match', 400))
    }
    const {user, token} = await userService.register(userData);
    //copy file to user folder
    res.status(200).json({
        success: true,
        data: {user, token}
    })
})

exports.login = catchAsync(async (req, res, next) => {

    const {email, username, password} = req.body;
    console.log(email, username, password)

    const {user, token} = await userService.login(email, username, password);


    res.status(200).json({
        success: true,
        data: {user, token}
    })
})
exports.me = catchAsync(async (req, res, next) => {


    const user = req.user;

    res.status(200).json({
        success: true,
        data: {user}
    })
})

exports.protect = catchAsync(async (req, res, next) => {

    console.log('hi')
    const user = await userService.protect(req.headers.authorization);

    req.user = user;
    next();
})