import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    mode: "light",
    user: null,
    token: null,
    posts: [],
    friends: []
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setFriends: (state, action) => {
            if (state.user) {
                state.user.friends = action.payload.friends;
            } else {
                console.error("user friends non-existent :(");
            }
        },
        removeFriend: (state, action) => {
            state.user.friends = state.user.friends.filter(
                (friend) => friend._id !== action.payload.friendId
            );
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },
        addPost: (state, action) => {
            console.log(action.payload.post)
            const updatedPosts = [action.payload.post, ...state.posts];
            state.posts = updatedPosts
            console.log('ind', state.posts);
        },
        updatePost: (state, action) => {
            const updatedPosts = state.posts.map((post) => {
                if (post._id === action.payload.post._id) return action.payload.post;
                return post;
            });
            state.posts = updatedPosts;
        },
        deletePost: (state, action) => {
            const updatedPosts = state.posts.filter((post) =>
                post._id !== action.payload.post._id
            );
            console.log(updatedPosts)
            state.posts = updatedPosts;
        },
    },
});

export const {setMode, setLogin, setLogout, setFriends, removeFriend, setPosts, addPost, updatePost, deletePost} =
    authSlice.actions;
export default authSlice.reducer;