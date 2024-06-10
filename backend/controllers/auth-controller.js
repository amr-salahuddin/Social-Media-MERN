const User = require("../models/user");

const userService = require("../services/user-service");

const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const {tokenize,decode} = require("../utils/tokenization");

exports.adminOnly = catchAsync(async (req, res, next) => {
    if (req.user.role !== 'admin') {
        return next(new AppError("You are not authorized to perform this action", 401));
    }
    next();
})
exports.protect = catchAsync(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];

    }

    if (!token) {

        return next(new AppError("You are not logged in! Please log in to get access", 401));
    }

    const decoded = decode(token);
    const id = decoded.id;
    const exists = await userService.checkUserExist(id);
    if (!exists) {
        return next(new AppError("The user belonging to this token does no longer exist", 401));
    }
    const user = await userService.getUser(id);
    req.user = user;
    next();

})
exports.register = catchAsync(async (req, res, next) => {
    const {firstName, lastName, email, password, passwordConfirm} = req.body;

    const exists = await userService.checkUserExistsByEmail(email);
    if (exists) {
        return next(new AppError("Email already exists", 400));
    }
    const userInfo =
        {

            firstName,
            lastName,
            email,
            password,
            passwordConfirm
        }
    const user = await userService.register(userInfo);

    res.status(201).json({
            message: "User Registered",
            code: "USER_REGISTERED",
            data: {
                user
            }

        }
    );
})

exports.login = catchAsync(async (req, res, next) => {
    const {email, password} = req.body;

    const login = await userService.login(email,password);

    if (!login) {
        return next(new AppError("Invalid email or password", 401));
    }
    const {token, user} = login;


    return res.status(201).json({
            message: "OK",
            data: {
                token,
                user
            }
        }
    );
})

exports.deleteAll = catchAsync(async (req, res, next) => {
    await User.deleteMany();
    res.status(201).json({
            message: "OK",
        }
    );
})
