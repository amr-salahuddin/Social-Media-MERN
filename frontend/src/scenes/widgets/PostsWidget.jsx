import React, {useEffect, useState} from 'react';
import { Box } from '@mui/material';
import PostWidget from './PostWidget';
import {useSelector} from "react-redux";

const PostsWidget = () => {

    const [posts, setPosts] = useState(null)

    const id = useSelector((state) => state.user._id)

    console.log(process.env.REACT_APP_BACKEND)
    const getPosts = async () => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND}/user/posts/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },

        })
        if(response.ok) {
            const data = await response.json();
            setPosts(data.data.posts);
        }
        else{
            console.log(response)
        }
    }

    useEffect(()=>{
        getPosts();
    },[])
    if(!posts) return null;
    return (
        <Box>
            {posts.map((post) => (
                <PostWidget key={post._id} post={post} />
            ))}
        </Box>
    );
};

export default PostsWidget;
