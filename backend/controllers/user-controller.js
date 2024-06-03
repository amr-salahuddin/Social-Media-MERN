const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");


exports.getUser = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return new AppError("User not found", 404);
    }
    res.status(201).json({
        message: "OK",
        data: {user}
    });
})

exports.getFriends = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const user = await User.findById(id).populate("friends", "firstName lastName picture");
    //only get id firstName, lastName and picture

    res.status(201).json({
        message: "OK",
        data: {friends: user.friends}
    });
})

exports.removeFriend = catchAsync(async (req, res, next) => {
    const user = req.user;
    if (user.id === req.params.id) {
        return next(new AppError('You cannot remove yourself as a friend', 400));
    }
    const friendToRemove = await User.findById(req.params.id);

    user.friendRequests = user.friendRequests.filter((friend) => friend.toString() !== req.params.id);
    user.friends = user.friends.filter((friend) => friend.toString() !== req.params.id);
    friendToRemove.friends = friendToRemove.friends.filter((friend) => friend.toString() !== user.id);
    friendToRemove.friendRequests = friendToRemove.friendRequests.filter((friend) => friend.toString() !== user.id);

    await user.save();
    await friendToRemove.save();
    return res.status(201).json({
        message: "Friend Removed",
        code: "FRIEND_REMOVED",
        data: {user}
    });
})
exports.friendRequest = catchAsync(async (req, res, next) => {

    const user = req.user;
    if (user.id === req.params.id) {
        return next(new AppError('You cannot send a friend request to yourself', 400));
    }
    if (user.friendRequests.includes(req.params.id)) {
        return next(new AppError('You already sent a friend request', 400));
    }
    const friendToRequest = await User.findById(req.params.id);

    //Add Friend
    if (friendToRequest.friendRequests.includes(user.id)) {
        user.friends.push(req.params.id);
        friendToRequest.friends.push(user.id);
        friendToRequest.friendRequests = friendToRequest.friendRequests.filter((friend) => friend.toString() !== user.id);
        await user.save();
        await friendToRequest.save();
        return res.status(201).json({
            message: "Friend Added",
            code: 'FRIEND_ADDED',
            data: {user}
        });
    }
    user.friendRequests.push(req.params.id);
    await user.save();
    return res.status(201).json({
        message: "Friend Request Sent",
        code: 'FRIEND_REQUEST_SENT',
        data: {user}
    });
})
