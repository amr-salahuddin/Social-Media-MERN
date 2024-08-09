import React from 'react';
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

const ProfileWidget = () => {
    // Mock data
    const name = "John Doe";
    const numberOfFriends = 120;
    const location = "New York, USA";
    const occupation = "Software Engineer";
    const profileViews = 350;
    const postImpressions = 1500;
    const {palette} = useTheme();
    const medium = palette.neutral.medium;

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
            <Box display="flex" justifyContent='space-between' alignItems="center" mb={2}>
                <Typography variant="body2" fontWeight="bold">Number of impressions in your posts</Typography>
                <Typography color={medium} variant="body2">{postImpressions}</Typography>
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
                            <Typography color="textSecondary">johndoe</Typography>
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
