import React from 'react';
import {Box, Typography, Avatar, IconButton, Divider} from '@mui/material';
import {MoreHoriz, Favorite, Comment, Share} from '@mui/icons-material';
import {WidgetWrapper} from '../../components/WidgetWrapper';
import dayjs from 'dayjs';

const PostWidget = ({post}) => {

    const user = post.user;
    const fullName = `${user.firstName} ${user.lastName}`;
    const formattedDate = dayjs(post.createdAt).format('DD/MM/YYYY HH:mm:ss');


    const mediaBox = post.media.map((x)=>{
        const path = `${process.env.REACT_APP_BACKEND_BASE}/${x.path}`
        console.log(x.mimetype.split('/')[0])
        if(x.mimetype.split('/')[0] == 'image'){
            return(
                <Box
                    component="img"
                    src={path}

                    alt="Post media"
                    width="100%"
                    borderRadius="0.5rem"
                    mb={1}
                />
            )
        }
        else{
            return(
                <Box
                    component="video"
                    src={path}


                    alt="Post media"
                    width="100%"
                    borderRadius="0.5rem"
                    mb={1}
                    onClick={(e)=> e.target.play()}
                />
            )
        }
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
                <IconButton>
                    <MoreHoriz/>
                </IconButton>
            </Box>

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
