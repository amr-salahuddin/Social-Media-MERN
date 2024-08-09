import React from 'react';
import {Box, Avatar, TextField, Button, Typography, Divider, useTheme} from '@mui/material';
import {Image, VideoLibrary, AttachFile, Audiotrack} from '@mui/icons-material';
import {WidgetWrapper} from "../../components/WidgetWrapper";
import {FlexBetween} from "../../components/FlexBetween";

const MediaPostWidget = () => {
    const theme = useTheme();
    return (
        <WidgetWrapper>
            {/* Avatar and Search Bar */}
            <Box display="flex" alignItems="center" mb={2}>
                <Avatar sx={{width: 56, height: 56, mr: 2}}/>
                <TextField
                    variant="outlined"
                    placeholder="What's on your mind?"
                    fullWidth
                    multiline
                    minRows={'1'}
                    maxRows={'8'}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            height: '100%',  // Ensure the input takes full height
                            borderRadius: '0.75rem'  // Match the border radius of WidgetWrapper
                        },
                        // Custom scrollbar styling for WebKit browsers
                        '& .MuiInputBase-input::-webkit-scrollbar': {
                            width: '8px',
                        },
                        '& .MuiInputBase-input::-webkit-scrollbar-thumb': {
                            backgroundColor: 'green',
                            borderRadius: '4px',
                        },
                        '& .MuiInputBase-input::-webkit-scrollbar-thumb:hover': {
                            backgroundColor: '#555',
                        },
                        // Custom scrollbar styling for Firefox
                        '& .MuiInputBase-input': {
                            scrollbarWidth: 'thin',
                            scrollbarColor: `${theme.palette.primary.main} ${theme.palette.background.alt}`,
                        },
                    }}
                />
            </Box>
            <Divider sx={{mb: 2}}/>

            {/* Media Options */}
            <FlexBetween alignItems='center' mb='1rem' >
                <FlexBetween  >
                    <Button startIcon={<Image/>} sx={{mx: 1}}>Image</Button>
                    <Button startIcon={<VideoLibrary/>} sx={{mx: 1}}>Video</Button>
                    <Button startIcon={<AttachFile/>} sx={{mx: 1}}>Attachment</Button>
                    <Button startIcon={<Audiotrack/>} sx={{mx: 1}}>Audio</Button>

                </FlexBetween>
                <Button variant="contained" color="primary">
                    Post
                </Button>
            </FlexBetween >
            {/*<Divider sx={{mb: 2}}/>*/}

            {/* Post Button */}

        </WidgetWrapper>
    );
}

export default MediaPostWidget;
