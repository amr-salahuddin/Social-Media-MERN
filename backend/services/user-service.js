const User = require("../models/user");
const mongoose = require("mongoose");

class UserService {

    async getUser(id) {
        const user = await User.findById(id);
        return user;
    }

    async checkUserExist(id) {
        console.log('ex');
        //project only id
        const user = await User.findById(id, {_id: 1, deleted: 1});
        console.log(user);
        return !(!user || user.deleted);

    }

    async getFriends(id, page, limit) {

        const user = await User.findById(id).populate({
            path: "friends",
            select: "firstName lastName picture",
            options: {
                skip: (page - 1) * limit,
                limit
            }
        });

        //only get id firstName, lastName and picture
        return user.friends;
    }

    async getFriendRequests(id, page, limit) {

        const user = await User.findById(id).populate({
            path: "friendRequests",
            select: "firstName lastName picture",
            options: {
                skip: (page - 1) * limit,
                limit
            }
        });

        //only get id firstName, lastName and picture
        return user.friendRequests;
    }

    async getUserPosts(id, page, limit) {
        const user = await  User.findById(id).populate({
            path: "posts",
            select: "content media",
            options: {
                skip: (page - 1) * limit,
                limit
            }
        });
        return user.posts;
    }

    async getLikedPosts(id, page, limit) {
        const user = await  User.findById(id).populate({
            path: "likedPosts",
            select: "content media",
            options: {
                skip: (page - 1) * limit,
                limit
            }
        });
        return user.likedPosts;
    }

    async getSavedPosts(id, page, limit) {
        const user = await  User.findById(id).populate({
            path: "savedPosts",
            select: "content media",
            options: {
                skip: (page - 1) * limit,
                limit
            }
        });
        return user.savedPosts;
    }

    async getComments(id, page, limit) {
        const user = await  User.findById(id).populate({
            path: "comments",
            select: "content media",
            options: {
                skip: (page - 1) * limit,
                limit
            }
        });
        return user.comments;
    }

    async getLikedComments(id, page, limit) {
        const user = await  User.findById(id).populate({
            path: "likedComments",
            select: "content media",
            options: {
                skip: (page - 1) * limit,
                limit
            }
        });
        return user.likedComments;
    }

}

module.exports = new UserService()