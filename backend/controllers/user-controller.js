const User = require('../models/user');
const userService = require('../services/user-service');
const catchAsync = require('../utils/catchAsync');
const mongoose = require("mongoose");
const mId = require("../utils/mId");
exports.getAllUsers = catchAsync(async (req, res, next) => {
    const users = await userService.getAllUsers();

    res.status(200).json({
        success: true,
        data: {users}
    })
})


exports.getUserByUsername = catchAsync(async (req, res, next) => {
    return await userService.getUserByUsername(username);
})

exports.getUser = catchAsync(async (req, res, next) => {
    const userId = mId(req.params.id);
    const user = await userService.getUser(userId);


    res.status(200).json({
        success: true,
        data: {user}
    })
})

exports.deleteAllUsers = catchAsync(async (req, res, next) => {
    const users = await userService.deleteAllUsers();

    res.status(204).json({
        success: true,
        data: {users}
    })
})

exports.getFriends = catchAsync(async (req, res, next) => {
    const userId = mId(req.params.id);
    const {page, limit} = req.query;
    const friends = await userService.getFriends(userId, page, limit);
    res.status(200).json({
        success: true,
        page,
        limit,
        data: {friends}
    })
})

exports.addFriend = catchAsync(async (req, res, next) => {
    const user = req.user;
    const friendId = mId(req.params.id);
    const {friend, added} = await userService.addFriend(user, friendId);
    res.status(200).json({
        success: true,
        data: {friend, added}
    })
});

exports.removeFriend = catchAsync(async (req, res, next) => {
    const user = req.user;
    const friendId = mId(req.params.id);
    //make friendId mongoose object
    const friend = await userService.removeFriend(user, friendId);
    res.status(200).json({
        success: true,
        data: {friend}
    })
})

exports.getFriendRequests = catchAsync(async (req, res, next) => {
    const user = req.user;
    const friendRequests = await userService.getFriendRequests(user);
    res.status(200).json({
        success: true,
        data: {friendRequests}
    })
})

exports.getSentFriendRequests = catchAsync(async (req, res, next) => {
    const user = req.user;
    const sentFriendRequests = await userService.getSentFriendRequests(user);
    res.status(200).json({
        success: true,
        data: {sentFriendRequests}
    })
})

exports.getBlockedUsers = catchAsync(async (req, res, next) => {
    const user = req.user;
    const blockList = await userService.getBlockedUsers(user);
    res.status(200).json({
        success: true,
        data: {blockList}
    })
})


exports.block = catchAsync(async (req, res, next) => {
    const user = req.user;
    const friendId = mId(req.params.id);
    const friend = await userService.block(user, friendId);
    res.status(200).json({
        success: true,
        data: {friend}
    })
})

exports.unblock = catchAsync(async (req, res, next) => {
    const user = req.user;
    const friendId = mId(req.params.id);
    await userService.unblock(user, friendId);
    res.status(204).json({})
})

exports.report = catchAsync(async (req, res, next) => {
    const user = req.user;
    const reportedId = mId(req.params.id);
    const report =  {code, description, attachment, reportedModel} = req.body;
   const newReport =await userService.report(user, reportedId, report);
    res.status(201).json({
        success: true,
        data: {report: newReport}
    })
})
exports.getReport = catchAsync(async (req, res, next) => {
    const user = req.user;
    const reportedId = mId(req.params.id);
    const report = await userService.getReport(user, reportedId);
    res.status(200).json({
        success: true,
        data: {report}
    })
})
exports.getIssuedReports = catchAsync(async (req, res, next) => {
    const user = req.user;
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const reports = await userService.getIssuedReports(user, page, limit);
    res.status(200).json({
        success: true,
        data: {reports}
    })
})
exports.getReceivedReports = catchAsync(async (req, res, next) => {
    const user = req.user;
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const reports = await userService.getReceivedReports(user,page,limit);
    res.status(200).json({
        success: true,
        data: {reports}
    })
})

exports.clearReceivedReports = catchAsync(async (req, res, next) => {
    const userId = mId(req.params.id);

})
