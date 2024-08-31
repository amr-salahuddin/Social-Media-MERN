import React, {useEffect, useState} from 'react';
import {Divider, List, Typography} from '@mui/material';
import {WidgetWrapper} from '../../components/WidgetWrapper';
import {useDispatch, useSelector} from "react-redux";
import {getFriendsAPI} from "../../apiRequests";
import FriendWidget from "./FriendWidget";
import {setFriends} from "../../state"; // Assuming WidgetWrapper is in the same directory

const FriendList = () => {

    const id = useSelector((state) => state.user._id);

    const dispatch = useDispatch();
    let friends = useSelector((state) => state.user.friends);
    const getFriends = async () => {
        const {ok, friendsData} = await getFriendsAPI(id);
        if(ok){
            dispatch(setFriends({ friends: friendsData}));
            console.log(friendsData,friends)
        }
    }
    useEffect(() => {
        getFriends();
    },[])

    if(!friends)
        return null;

    return (
        <WidgetWrapper>
            {/* Title */}
            <Typography  fontWeight="bold" >
                Friend List
            </Typography>

            {/* Friend List */}
            <List>
                {friends.map((friend,index) => (
                    <React.Fragment key={friend._id}>
                        <FriendWidget friend={friend}/>
                        {index < friends.length - 1 && <Divider variant="inset" component="li"/>}
                    </React.Fragment>
                ))}
            </List>
        </WidgetWrapper>
    );
};

export default FriendList;
