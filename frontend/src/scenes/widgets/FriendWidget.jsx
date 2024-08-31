import {Avatar, Box, Divider, IconButton, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import {RemoveCircleOutline} from "@mui/icons-material";
import React from "react";
import {removeFriendAPI} from "../../apiRequests";
import {useDispatch, useSelector} from "react-redux";
import {removeFriend} from "../../state";

const FriendWidget = ({friend}) => {

    const token = useSelector((state) => state.token);
    const dispatch = useDispatch();
    const handleUnfriend = (friendId) => {

        const ok = removeFriendAPI(token,friendId)
        if(ok){

            dispatch(removeFriend({ friendId }));

        }
    };
    return (
        <Box key={friend._id}>
            <ListItem alignItems="center">
                {/* Avatar */}
                <ListItemAvatar>
                    <Avatar src={friend.avatarUrl} alt={friend.name}/>
                </ListItemAvatar>
                {/* Name and Occupation */}
                <ListItemText
                    primary={friend.firstName + ' ' + friend.lastName}
                    secondary={friend.occupation}
                />
                {/* Unfriend Button */}
                <IconButton
                    edge="end"
                    aria-label="unfriend"
                    onClick={() => handleUnfriend(friend._id)}
                >
                    <RemoveCircleOutline/>
                </IconButton>
            </ListItem>
            {/* Divider between friends, except after the last one */}
        </Box>
    )
}
export default FriendWidget