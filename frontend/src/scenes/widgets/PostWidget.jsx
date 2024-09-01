import React, {useEffect, useRef, useState} from 'react';
import {
    Avatar,
    Box,
    Divider,
    IconButton,
    InputAdornment,
    Menu,
    MenuItem,
    TextField,
    Typography,
    useTheme
} from '@mui/material';
import {Comment, Favorite, MoreHoriz, Send, Share} from '@mui/icons-material';
import {WidgetWrapper} from '../../components/WidgetWrapper';
import dayjs from 'dayjs';
import Media from "../../components/Media/Media";
import {commentAPI, deletePostAPI, getCommentsAPI, likePostAPI, uncommentAPI} from "../../apiRequests";
import {useDispatch, useSelector} from "react-redux";
import {deletePost, updatePost} from "../../state";
import CommentWidget from "./CommentWidget";
import NewCommentWidget from "./NewCommentWidget";
import MediaGrid from "../../components/MediaGrid";

const PostWidget = ({post}) => {


    const theme = useTheme();
    const [isLiked, setIsLiked] = useState(0)
    const [optionsAnchorEl, setOptionsAnchorEl] = useState(null)
    const isMenuOpen = Boolean(optionsAnchorEl);
    const token = useSelector((state) => state.token);
    const id = useSelector((state) => state.user._id);
    const dispatch = useDispatch();
    const hasLoadedOnce = useRef(false); // Track initial load

    //region comments
    const [comments, setComments] = useState([]);
    const [firstCommentsFetch, setFirstCommentsFetch] = useState(false);
    const [page, setPage] = useState(1);
    const [commentsLoading, setCommentsLoading] = useState(false);
    const [hasMoreComments, setHasMoreComments] = useState(true);
    //endregion

    const host = `${process.env.REACT_APP_BACKEND_BASE}`
    useEffect(() => {

        setIsLiked(post.likes.some(like => like.user == id));
    }, [post.likes]);

    if (!firstCommentsFetch) {
        handleLoadComments();
        setFirstCommentsFetch(true);
    }

    function handleOptionsClick(event) {

        setOptionsAnchorEl(event.currentTarget);
    }

    function handleOptionsClose() {
        setOptionsAnchorEl(null);


    }

    async function handleMenuDeleteClick() {


        const responseOk = await deletePostAPI(token, post._id)
        if (responseOk) {

            dispatch(deletePost({post: {_id: post._id}}));

        }
    }

    async function handleLoadComments() {
        const {ok, fetchedComments} = await getCommentsAPI(post._id, page);
        if (ok && fetchedComments.length > 0) {
            setComments((prev) => [...prev, ...fetchedComments]);
        } else {

            setHasMoreComments(false);
        }

    }


    const user = post.user;
    const fullName = `${user.firstName} ${user.lastName}`;
    const formattedDate = dayjs(post.createdAt).format('DD/MM/YYYY HH:mm:ss');


    async function handleLike() {
        let type = !isLiked;
        type *= 1;
        setIsLiked(type);
        const newPost = {...post, likes: [...post.likes]};
        if (type == 0)
            newPost.likes = newPost.likes.filter(like => like.user != id);
        else
            newPost.likes.push({user: id, type});

        dispatch(updatePost({post: newPost}));

        const ok = await likePostAPI(token, post._id, type);
    }

    async function handleCommentSubmit(comment, files) {

        console.log(comment);
        const {ok, commentData} = await commentAPI(token, post._id, comment, files);
        console.log(commentData);
        commentData.user = {_id: id, firstName: user.firstName, lastName: user.lastName, pictureUrl: user.pictureUrl};
        if (ok) {
            setComments((prev) => [commentData, ...prev]);
        }

    }

    async function handleCommentDelete(commentId) {
        const ok = await uncommentAPI(token, commentId);
        if (ok) {
            setComments((prev) => prev.filter(comment => comment._id != commentId));
        }
    }

    return (
        <WidgetWrapper mb={2}>
            {/* Header: Avatar, Name, Date, and More Options */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Box display="flex" alignItems="center">
                    <Avatar src={user.pictureUrl} alt={fullName}/>
                    <Box ml={2}>
                        <Typography fontWeight="bold">{fullName}</Typography>
                        <Typography variant="body2" color="textSecondary">
                            {formattedDate}
                        </Typography>
                    </Box>
                </Box>
                <IconButton onClick={handleOptionsClick}>
                    <MoreHoriz/>
                </IconButton>
            </Box>

            <Menu
                anchorEl={optionsAnchorEl}
                disableScrollLock
                open={isMenuOpen}
                onClose={handleOptionsClose}
                anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                transformOrigin={{vertical: 'top', horizontal: 'right'}}

            >
                <MenuItem onClick={handleOptionsClose}>Edit</MenuItem>
                <MenuItem onClick={handleMenuDeleteClick}>Delete</MenuItem>
            </Menu>

            {/* Description */}
            <Typography mb={1}>{post.description}</Typography>

            {/* Media (Image/Video) */}


            <MediaGrid host={host} media={post.media}/>

            {/* Likes, Comments, Shares */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mt={2} mb={1}>
                <Typography variant="body2">
                    {post.likes.length} Likes
                </Typography>
                <Typography variant="body2">
                    {comments.length} Comments · 0 Shares
                </Typography>
            </Box>

            <Divider/>

            {/* Like, Comment, Share Buttons */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mt={1} mb={1}>
                <IconButton onClick={handleLike}>
                    <Favorite sx={{color: isLiked ? 'red' : ''}}/>
                </IconButton>
                <IconButton>
                    <Comment/>
                </IconButton>
                <IconButton>
                    <Share/>
                </IconButton>
            </Box>


            {/* Comments Section */}
            <NewCommentWidget theme={theme} handleCommentSubmit={handleCommentSubmit}/>
            <Box mt={1}>
                {comments.map((comment, index) => (
                    <Box key={index} sx={{mt: 1,mb:6}}>
                        < CommentWidget handleCommentDelete={handleCommentDelete} key={comment._id} comment={comment}/>
                    </Box>
                ))}
            </Box>
        </WidgetWrapper>
    );
};

export default PostWidget;
