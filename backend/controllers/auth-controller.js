const User = require("../models/user");
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.adminOnly = catchAsync(async (req, res, next) => {
    if(req.user.role !== 'admin'){
        return next(new AppError("You are not authorized to perform this action", 401));
    }
    next();
})
exports.protect = catchAsync(async (req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];

    }

    if(!token){

        return next(new AppError("You are not logged in! Please log in to get access", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if(!user){
        return next(new AppError("The user belonging to this token does no longer exist", 401));
    }
    req.user = user;
    next();

})
exports.register = catchAsync(async (req, res, next) => {
    const {firstName, lastName, email, password, passwordConfirm} = req.body;

    if(await User.findOne({email})){
        console.log(email)
        return next(new AppError("Email already exists", 400));
    }
    await User.create(
        {

            firstName,
            lastName,
            email,
            password,
            passwordConfirm
        })

    res.status(201).json({
            message: "OK",

        }
    );
})

exports.login = catchAsync(async (req, res, next) => {
    const { email, password} = req.body;
    const user = await User.findOne({email});

    if(!user || !await user.matchPassword(password)){

        return next(new AppError("Invalid email or password", 401));
    }
    console.log('login')

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
    console.log('login')

    return res.status(201).json({
            message: "OK",
            data:{
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
