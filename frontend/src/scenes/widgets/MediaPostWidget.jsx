import React, {useState} from 'react';
import {Box, Avatar, TextField, Button, Typography, Divider, useTheme} from '@mui/material';
import {Image, VideoLibrary, AttachFile, Audiotrack} from '@mui/icons-material';
import {WidgetWrapper} from "../../components/WidgetWrapper";
import {FlexBetween} from "../../components/FlexBetween";
import {useDispatch, useSelector} from "react-redux";
import {addPost} from "../../state";
const MediaPostWidget = () => {
    const theme = useTheme();

    const [showFile, setShowFile] = useState()
    const [selectedFile, setSelectedFile] = useState(null);
    const [description, setDescription] = useState()
    function handleImageUpload(event) {
        const file = event.target.files[0];
        console.log(file, URL.createObjectURL(file));
        setShowFile(URL.createObjectURL(file));
        setSelectedFile(file);
    }
    const token = useSelector((state) => state.token);
    const dispatch = useDispatch();
    const sendPost = async () => {
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('description', description);

        const response = await fetch(`${process.env.REACT_APP_BACKEND}/post`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });

        if (response.ok) {
            const data = await response.json();
            dispatch(addPost({post: data.data.post}));

            console.log(data.data.post)


        } else {
            console.log(response)
        }
    }


    const handleSubmit = (event) => {
        sendPost()
        setSelectedFile(null);
        setShowFile(null);
        setDescription(null);
    }

    return (
        <WidgetWrapper>
            <input
                type="file"
                accept="*"
                id="image-upload"

                style={{display: 'none', position: 'absolute'}}
                onChange={handleImageUpload}
            />
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
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
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
                {/* Display Selected Image */}

            </Box>
            <Divider sx={{mb: 2}}/>
            {showFile && (
                <Box mt={2}>
                    <Typography variant="body2" mb={1}>Selected Image:</Typography>
                    <Box
                        component="img"
                        src={showFile}
                        alt="Selected"
                        width="100%"
                        height="auto"
                        sx={{borderRadius: '0.75rem'}}
                    />
                </Box>
            )}

            {/* Media Options */}
            <Box display='flex' justifyContent='end' mb='1rem'>

                <Button startIcon={<AttachFile/>} onClick={() => {
                    document.querySelector('#image-upload').click()
                }} sx={{mx: 1}}>Attachment</Button>

                <Button onClick={handleSubmit} variant="contained" color="primary">
                    Post
                </Button>
            </Box>
            {/*<Divider sx={{mb: 2}}/>*/}

            {/* Post Button */}

        </WidgetWrapper>
    );
}

export default MediaPostWidget;
