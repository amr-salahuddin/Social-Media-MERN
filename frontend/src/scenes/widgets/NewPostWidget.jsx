import React, {useRef, useState} from 'react';
import {Avatar, Box, Button, Divider, TextField, Typography, useTheme} from '@mui/material';
import {AttachFile} from '@mui/icons-material';
import {WidgetWrapper} from "../../components/WidgetWrapper";
import {useDispatch, useSelector} from "react-redux";
import {addPost} from "../../state";
import FileUploader from "../../components/FileUploader";
import MediaGrid from "../../components/MediaGrid";

const NewPostWidget = () => {
    const theme = useTheme();

    const fileUploadRef = useRef()
    const [showFiles, setShowFiles] = useState()
    const [files, setFiles] = useState(null);
    const [description, setDescription] = useState()

    function handleImageUpload(event) {
        const tempShowFiles = [];
        for (let i = 0; i < event.target.files.length; i++) {

            const file = event.target.files[i];

            console.log(file.path, 'sxs')
            const path = URL.createObjectURL(file)
            tempShowFiles.push(
                {
                    path,
                    originalname: file.name,
                    mimetype: file.type
                }
            );

        }

        setShowFiles(tempShowFiles);
        console.log('xxx', tempShowFiles, showFiles)
        setFiles(event.target.files);
    }

    const token = useSelector((state) => state.token);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const sendPost = async () => {
        const formData = new FormData();
        console.log(files)
        if (files)
            for (let i = 0; i < files.length; i++) {
                formData.append('file', files[i]); // Adjust 'file' key if multer expects something else
            }
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
            const post = data.data.post;
            post.user = user;
            dispatch(addPost({post}));


        } else {
            console.log(response)
        }
    }


    const handleSubmit = (event) => {
        sendPost()
        handleFilesCancel()
        setDescription(null);
    }
    const handleFilesCancel = () => {
        setFiles(null);
        setShowFiles(null);
    }

    return (
        <WidgetWrapper>
            <FileUploader fileUploadRef={fileUploadRef} fileUploadHandler={handleImageUpload}/>
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
                {/* Display Selected File */}

            </Box>
            <Divider sx={{mb: 2}}/>
            {showFiles && (
                <MediaGrid media={showFiles}/>
            )}

            {/* Media Options */}
            <Box display='flex' justifyContent='end' mb='1rem'>

                <Button startIcon={<AttachFile/>} onClick={() => {
                    fileUploadRef.current.click()
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

export default NewPostWidget;
