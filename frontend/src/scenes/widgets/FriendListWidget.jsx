import React from 'react';
import { Box, Typography, Avatar, List, ListItem, ListItemAvatar, ListItemText, IconButton, Divider } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { WidgetWrapper } from '../../components/WidgetWrapper'; // Assuming WidgetWrapper is in the same directory

const FriendList = ({ friends, handleUnfriend }) => {
    return (
        <WidgetWrapper>
            {/* Title */}
            <Typography  fontWeight="bold" >
                Friend List
            </Typography>

            {/* Friend List */}
            <List>
                {friends.map((friend, index) => (
                    <Box key={friend.id}>
                        <ListItem alignItems="center">
                            {/* Avatar */}
                            <ListItemAvatar>
                                <Avatar src={friend.avatarUrl} alt={friend.name} />
                            </ListItemAvatar>
                            {/* Name and Occupation */}
                            <ListItemText
                                primary={friend.name}
                                secondary={friend.occupation}
                            />
                            {/* Unfriend Button */}
                            <IconButton
                                edge="end"
                                aria-label="unfriend"
                                onClick={() => handleUnfriend(friend.id)}
                            >
                                <Delete />
                            </IconButton>
                        </ListItem>
                        {/* Divider between friends, except after the last one */}
                        {index < friends.length - 1 && <Divider variant="inset" component="li" />}
                    </Box>
                ))}
            </List>
        </WidgetWrapper>
    );
};

// Example usage with dummy data
const friendsExample = [
    {
        id: 1,
        name: 'John Doe',
        avatarUrl: 'https://via.placeholder.com/50', // Replace with actual avatar URL
        occupation: 'Software Engineer',
    },
    {
        id: 2,
        name: 'Jane Smith',
        avatarUrl: 'https://via.placeholder.com/50', // Replace with actual avatar URL
        occupation: 'Graphic Designer',
    },
    {
        id: 3,
        name: 'Bob Johnson',
        avatarUrl: 'https://via.placeholder.com/50', // Replace with actual avatar URL
        occupation: 'Product Manager',
    },
];

// Example handleUnfriend function
const handleUnfriend = (friendId) => {
    console.log(`Unfriended friend with ID: ${friendId}`);
};

const FriendListExample = () => <FriendList friends={friendsExample} handleUnfriend={handleUnfriend} />;

export default FriendListExample;
