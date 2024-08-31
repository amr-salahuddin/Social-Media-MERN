const User = require('../models/user');
const Post = require("../models/post");
const Comment = require("../models/comment");
const {tokenize, decode} = require('../utils/tokenization');
const AppError = require("../utils/appError");
const Report = require('../models/report');

exports.getUser = async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new AppError('User not found', 404)
    }
    return user;
}

exports.getAllUsers = async () => {
    const users = await User.find();
    return users;
}

exports.getUserByUsername = async (username) => {
    const user = await User.findOne({username: username});
    return user;
}

exports.register = async (user) => {
    const newUser = new User(user);
    await newUser.save()

    const token = tokenize({id: newUser._id});

    console.log('done')
    return {user: newUser, token};
}

exports.deleteAllUsers = async () => {
    await User.deleteMany();
}

exports.login = async (email, username, password) => {

    if (!email && !username) {
        throw new AppError('Please provide email or username', 400)
    }
    if (!password) {
        throw new AppError('Please provide password', 400)
    }

    const user = await User.findOne({$or: [{email}, {username}]}).select('+password');

    console.log(password, user.password)
    if (!user || !await user.correctPassword(password, user.password)) {
        throw new AppError('Incorrect email or password', 401)
    }

    const token = tokenize({id: user._id});

    return {user, token};
}

exports.protect = async (bearer) => {

    let token;
    if (bearer && bearer.startsWith('Bearer')) {
        token = bearer.split(' ')[1];
    }

    if (!token) {
        throw new AppError('You are not logged in. Please log in to get access', 401)
    }

    const decoded = decode(token);

    const user = await this.getUser(decoded.id);

    return user;

}


exports.getFriends = async (id, page, limit) => {
    //populate friends and get only firstname sceond name and avatar
    const userWithFriends = await User.findById(id).select('friends').populate(
        {
            path: 'friends',
            sort: '-createdAt',
            select: 'firstName lastName imageUrl',
            option: {
                limit,
                skip: (page - 1) * limit
            }
        });

    return userWithFriends.friends;
}

exports.getFriendRequests = async (id, page, limit) => {
    const userWithFriendRequests = await User.findById(id).select('friendRequests').populate(
        {
            path: 'friendRequests',
            sort: '-createdAt',
            select: 'firstName lastName imageUrl',
            option: {
                limit,
                skip: (page - 1) * limit
            }
        }
    )
    return userWithFriendRequests.friendRequests
}

exports.getSentFriendRequests = async (id, page, limit) => {
    const userWithSentFriendRequests = await User.findById(id).select('sentFriendRequests').populate(
        {
            path: 'sentFriendRequests',
            sort: '-createdAt',
            select: 'firstName lastName imageUrl',
            option: {
                limit,
                skip: (page - 1) * limit
            }
        }
    )

    return userWithSentFriendRequests.sentFriendRequests
}

exports.addFriend = async (user, friendId) => {

    const friend = await this.getUser(friendId);

    //check if already friends
    if (user.friends.includes(friendId)) {
        return {friend, added: 0}
    }
    let added = 0;
    if (user.friendRequests.includes(friendId)) {
        user.friends.push(friendId);
        friend.friends.push(user._id);
        user.friendRequests = user.friendRequests.filter((id) => !id.equals(friendId));
        friend.sentFriendRequests = friend.sentFriendRequests.filter((id) => !id.equals(user._id));
        await user.save();
        await friend.save();
        added = 1;
    } else {
        if (!user.sentFriendRequests.includes(friendId))
            user.sentFriendRequests.push(friendId);
        if (!friend.friendRequests.includes(user._id))
            friend.friendRequests.push(user._id);

        await user.save();
        await friend.save();
    }

    return {friend, added};
}
exports.removeFriend = async (user, friendId) => {

    const friend = await this.getUser(friendId);
    user.friends = user.friends.filter((id) => !id.equals(friendId));
    friend.friends = friend.friends.filter((id) => !id.equals(user._id));
    user.friendRequests = user.friendRequests.filter((id) => !id.equals(friendId));
    friend.friendRequests = friend.friendRequests.filter((id) => !id.equals(user._id));
    user.sentFriendRequests = user.sentFriendRequests.filter((id) => !id.equals(friendId));
    friend.sentFriendRequests = friend.sentFriendRequests.filter((id) => !id.equals(user._id));
    console.log(user.sentFriendRequests, friendId, friend.friendRequests, user._id)
    await user.save();
    await friend.save();

    return friend;
}
exports.block = async (user, friendId) => {

    await this.removeFriend(user, friendId);
    if (!user.blocked.includes(friendId))
        user.blocked.push(friendId);
    await user.save();

}
exports.unblock = async (user, friendId) => {

    user.blocked = user.blocked.filter((id) => !id.equals(friendId));
    await user.save();

}
exports.getBlockedUsers = async (id, page, limit) => {
    const blocked = await User.findById(id).populate(
        {
            path: 'blocked',
            sort: '-createdAt',
            select: 'firstName lastName imageUrl',
            option: {
                limit,
                skip: (page - 1) * limit
            }
        })
}


exports.getUserStatus = async (id) => {
    const user = await User.findById(id);
    return user.status;
}

exports.report = async (user, reportedId, report) => {
    const {code, description, attachment, reportedModel} = report;
    console.log(report);
    const newReport = new Report({
        code,
        description,
        attachment,
        reportedModel,
        reportedId,
        issuedBy: user._id,
        createdAt: Date.now(),
        status: 0
    })

    await newReport.save();
    console.log(newReport);
    let reportedEntity;
    if (reportedModel === "user") {
        reportedEntity = await this.getUser(reportedId)
    } else if (reportedModel === "post")
        reportedEntity = await Post.findById(reportedId);
    else if (reportedModel === "comment")
        reportedEntity = await Comment.findById(reportedId);

    reportedEntity.reportsReceived.push(newReport._id);
    console.log(reportedEntity, reportedEntity.reportsReceived);
    await reportedEntity.save();

    user.reportsIssued.push(newReport._id);
    await user.save();
    return newReport
}
exports.getIssuedReports = async (user, page, limit) => {
    const reports = await Report.find(
        {
            _id: {$in: user.reportsIssued}
        }
    ).sort('-createdAt').skip((page - 1) * limit).limit(limit);
    return reports
}

exports.getReceivedReports = async (user, page, limit) => {
    const reports = await Report.find({
        _id: {$in: user.reportsReceived}
    }).sort('-createdAt').skip((page - 1) * limit).limit(limit);
    return reports
}
exports.getReport = async (user, id) => {
    const report = await Report.findById(id);
    if (!report)
        throw new AppError("Report not found", 404);
    if (!report.issuedBy.equals(user._id) && !report.reportedId.equals(user._id)) {
        throw new AppError("Access denied", 403);
    }

    return report;

}