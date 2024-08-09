import React from 'react';
import { Box } from '@mui/material';
import PostWidget from './PostWidget';

const PostsWidget = ({ posts }) => {
    return (
        <Box>
            {posts.map((post) => (
                <PostWidget key={post.id} post={post} />
            ))}
        </Box>
    );
};

export default PostsWidget;
