import React from 'react';
import { Box, Typography, Avatar, IconButton, Divider } from '@mui/material';
import { MoreHoriz, Favorite, Comment, Share } from '@mui/icons-material';
import { WidgetWrapper } from '../../components/WidgetWrapper';

const PostWidget = ({ post }) => {
    return (
        <WidgetWrapper mb={2}>
            {/* Header: Avatar, Name, Date, and More Options */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Box display="flex" alignItems="center">
                    <Avatar src={post.userAvatar} alt={post.userName} />
                    <Box ml={2}>
                        <Typography fontWeight="bold">{post.userName}</Typography>
                        <Typography variant="body2" color="textSecondary">
                            {post.date}
                        </Typography>
                    </Box>
                </Box>
                <IconButton>
                    <MoreHoriz />
                </IconButton>
            </Box>

            {/* Description */}
            <Typography mb={1}>{post.description}</Typography>

            {/* Media (Image/Video) */}
            {post.mediaUrl && (
                <Box
                    component="img"
                    src={post.mediaUrl}
                    alt="Post media"
                    width="100%"
                    borderRadius="0.5rem"
                    mb={1}
                />
            )}

            {/* Likes, Comments, Shares */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="body2">
                    {post.likes} Likes
                </Typography>
                <Typography variant="body2">
                    {post.comments.length} Comments · {post.shares} Shares
                </Typography>
            </Box>

            <Divider />

            {/* Like, Comment, Share Buttons */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mt={1} mb={1}>
                <IconButton>
                    <Favorite />
                </IconButton>
                <IconButton>
                    <Comment />
                </IconButton>
                <IconButton>
                    <Share />
                </IconButton>
            </Box>

            <Divider />

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
