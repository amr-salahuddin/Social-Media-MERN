import React, {useState} from 'react';
import {Box, Typography, Avatar, IconButton, Divider, Menu, MenuItem} from '@mui/material';
import {MoreHoriz, Favorite, Comment, Share,} from '@mui/icons-material';
import {WidgetWrapper} from '../../components/WidgetWrapper';
import dayjs from 'dayjs';
import Media from "../../components/Media/Media";
import {deletePostAPI} from "../../apiRequests";
import {useDispatch, useSelector} from "react-redux";
import {deletePost} from "../../state";

const PostWidget = ({post}) => {


    const [optionsAnchorEl, setOptionsAnchorEl] = useState(null)
    const isMenuOpen = Boolean(optionsAnchorEl);
    const token = useSelector((state) => state.token);
    let posts =useSelector((state)=>state.posts);

    const dispatch = useDispatch();
    function handleOptionsClick(event) {

        setOptionsAnchorEl(event.currentTarget);
    }

    function handleOptionsClose() {
        setOptionsAnchorEl(null);


    }

    async function handleMenuDeleteClick() {


        const responseOk = await deletePostAPI(token, post._id)
        if(responseOk){

            dispatch(deletePost({ post: { _id: post._id } }));

        }
    }

    const user = post.user;
    const fullName = `${user.firstName} ${user.lastName}`;
    const formattedDate = dayjs(post.createdAt).format('DD/MM/YYYY HH:mm:ss');
    const mediaBox = post.media.map((x, index) => {
        const path = `${process.env.REACT_APP_BACKEND_BASE}/${x.path}`
        return <Media  key={index} file={x}/>
    })//use intl
    return (
        <WidgetWrapper mb={2}>
            {/* Header: Avatar, Name, Date, and More Options */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Box display="flex" alignItems="center">
                    <Avatar src={user.avatarUrl} alt={fullName}/>
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
                <MenuItem onClick={handleMenuDeleteClick}>Delet</MenuItem>
            </Menu>

            {/* Description */}
            <Typography mb={1}>{post.description}</Typography>

            {/* Media (Image/Video) */}
            {mediaBox}

            {/* Likes, Comments, Shares */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="body2">
                    {post.likes} Likes
                </Typography>
                <Typography variant="body2">
                    {post.comments.length} Comments · 0 Shares
                </Typography>
            </Box>

            <Divider/>

            {/* Like, Comment, Share Buttons */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mt={1} mb={1}>
                <IconButton>
                    <Favorite/>
                </IconButton>
                <IconButton>
                    <Comment/>
                </IconButton>
                <IconButton>
                    <Share/>
                </IconButton>
            </Box>

            <Divider/>

            {/* Comments Section */}
            <Box mt={1}>
                {post.comments.map((comment, index) => (
                    <Box key={index} mb={1}>
                        <Typography variant="body2" fontWeight="bold">
                            {comment.userName}
                        </Typography>
                        <Typography variant="body2">
                            {comment.text}
                        </Typography>
                    </Box>
                ))}
            </Box>
        </WidgetWrapper>
    );
};

export default PostWidget;
