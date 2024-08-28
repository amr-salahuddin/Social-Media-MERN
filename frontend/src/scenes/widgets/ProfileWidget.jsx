import React, {useEffect, useState} from 'react';
import {Box, Button, Typography, Divider, Avatar, useTheme} from '@mui/material';
import {
    LocationOn,
    Work,
    Visibility,
    VisibilityOff,
    WorkOutlineOutlined,
    LocationOnOutlined, Twitter, EditOutlined, ManageAccountsOutlined
} from '@mui/icons-material';
import {WidgetWrapper} from "../../components/WidgetWrapper";
import {FlexBetween} from "../../components/FlexBetween";
import {useSelector} from "react-redux";

const ProfileWidget = () => {

    const [user, setUser] = useState(null)

    const {palette} = useTheme();

    const token = useSelector((state) => state.token)
    const getUser = async () => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND}/auth/me`, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`

            }

        })
        const data = await response.json()
        setUser(data.data.user);
    }
    useEffect(() => {
        getUser();
    },[])
    if(!user) return null
    // Mock data

    const name = `${user.firstName} ${user.lastName}`;
    //get user.friends array length

    const numberOfFriends = user.friends.length ||0;
    const location = user.location || "Unknown";
    const occupation = user.occupation|| "Unknown";
    const profileViews = user.profileViews || 0;
    const postImpressions = 1500;
    const medium = palette.neutral.medium;
    const username = user.username;

    return (
        <WidgetWrapper>
            {/* Profile Header */}
            <FlexBetween pb='1rem'>
                <FlexBetween gap='0.1rem'>
                    <Avatar sx={{width: 56, height: 56, mr: 2}}/>
                    <Box>
                        <Typography variant="h6" fontWeight="bold">{name}</Typography>
                        <Typography variant="body2" color="textSecondary">{numberOfFriends} friends</Typography>
                    </Box>
                </FlexBetween>
                <ManageAccountsOutlined/>
            </FlexBetween>

            <Divider sx={{mb: 2}}/>

            {/* Location and Occupation */}
            <Box display="flex" alignItems="center" mb={2}>
                <LocationOnOutlined sx={{mr: 1}}/>
                <Typography color={medium} variant="body2" mr={3}>{location}</Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={2}>
                <WorkOutlineOutlined sx={{mr: 1}}/>
                <Typography color={medium} variant="body2">{occupation}</Typography>
            </Box>
            <Divider sx={{mb: 2}}/>

            {/* Profile and Post Impressions */}
            <Box display="flex" justifyContent='space-between' alignItems="center" mb={2}>
                <Typography variant="body2" fontWeight="bold">Who's viewed your profile</Typography>
                <Typography color={medium} variant="body2">{profileViews}</Typography>
            </Box>


            <Divider/>
            {/* Social Media */}
            <Box p='1rem 0'>
                <Typography fontSize='1rem' fontWeight="bold" mb={2}>Social Profiles</Typography>
                <FlexBetween>

                    <FlexBetween gap='0.5rem'>
                        <Twitter sx={{mr: 1, fontSize: '1.5rem'}}/>
                        <Box>
                            <Typography fontWeight="bold">Twitter</Typography>
                            <Typography color="textSecondary">{username}</Typography>
                        </Box>
                    </FlexBetween>
                    {/* Modify Option */}
                    <EditOutlined/>
                </FlexBetween>
            </Box>
        </WidgetWrapper>
    );
}

export default ProfileWidget;
