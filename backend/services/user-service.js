const User = require("../models/user");
const mongoose = require("mongoose");
const {tokenize,decode} = require('../utils/tokenization')
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
    async checkUserExistsByEmail(email) {
        const user = await User.findOne({email});
        return !(!user || user.deleted);
    }

    async register(userInfo) {

        const user = await User.create(userInfo);
        return user;

    }
    async login(email,password){

        const user = await User.findOne({email});
        if(!user || !await user.matchPassword(password)){
            return null;
        }

        const token = tokenize({id: user._id});
        return {token,user};
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
        const user = await User.findById(id).populate({
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
        const user = await User.findById(id).populate({
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
        const user = await User.findById(id).populate({
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
        const user = await User.findById(id).populate({
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
        const user = await User.findById(id).populate({
            path: "likedComments",
            select: "content media",
            options: {
                skip: (page - 1) * limit,
                limit
            }
        });
        return user.likedComments;
    }

    async removeFriend(user, friendId) {
        user.friends = user.friends.filter((friend) => friend.toString() !== friendId);
        await user.save();
    }

    async removeFriendRequest(user, friendId) {
        user.friendRequests = user.friendRequests.filter((friend) => friend.toString() !== friendId);
        await user.save();
    }

    async sendFriendRequest(user, friend) {
        if (friend.friendRequests.includes(user.id)) {
            await this.removeFriendRequest(friend, user.id);
            user.friends.push(friend.id);
            friend.friends.push(user.id);
            await user.save();
            await friend.save();
            return 1;

        }
        else {
            user.friendRequests.push(friend.id);
            await user.save();
            return 0;
        }

    }
}


module.exports = new UserService()
