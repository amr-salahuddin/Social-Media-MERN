const userService = require("../services/user-service");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const User = require("../models/user");
exports.getUser = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const exists = await userService.checkUserExist(id);
    console.log(exists);
    if (!exists) {
        return next(new AppError("User not found", 404));
    }
    const user = await userService.getUser(id);
    res.status(201).json({
        message: "OK",
        data: {user}
    });
})

exports.getFriends = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const exists = await userService.checkUserExist(id);
    if (!exists) {
        return next(new AppError("User not found", 404));
    }

    const friends = await userService.getFriends(id, page, limit);
    //only get id firstName, lastName and picture

    res.status(201).json({
        message: "OK",
        data: {friends: friends}
    });
})

exports.removeFriend = catchAsync(async (req, res, next) => {
    const user = req.user;
    const friendId = req.params.id;
    if (user.id === friendId) {
        return next(new AppError('You cannot remove yourself as a friend', 400));
    }
    const friendExists = await userService.checkUserExist(friendId);
    if (!friendExists) {
        return next(new AppError('Friend not found', 404));
    }
    const friendToRemove = await userService.getUser(friendId);
    await userService.removeFriend(user, friendId);
    await userService.removeFriend(friendToRemove, user.id);
    return res.status(201).json({
        message: "Friend Removed",
        code: "FRIEND_REMOVED",
        data: {user}
    });
})
exports.friendRequest = catchAsync(async (req, res, next) => {

    const user = req.user;
    const friendId = req.params.id;
    if (user.id === friendId) {
        return next(new AppError('You cannot send a friend request to yourself', 400));
    }
    if (user.friendRequests.includes(friendId)) {
        return next(new AppError('You already sent a friend request', 400));
    }
    if (user.friends.includes(friendId)) {
        return next(new AppError('You are already friends', 400));
    }
    const friendToRequest = await User.findById(req.params.id);

    //Add Friend
    const friendRequest = await userService.sendFriendRequest(user, friendToRequest);
    if (friendRequest == 0) {
        return res.status(201).json({
            message: "Friend Request Sent",
            code: 'FRIEND_REQUEST_SENT',
            data: {user}
        })
    } else
        return res.status(201).json({
            message: "Friend Added",
            code: 'FRIEND_ADDED',
            data: {user}
        });
})
