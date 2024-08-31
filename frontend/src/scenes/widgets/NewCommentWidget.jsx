import {Box, IconButton, InputAdornment, TextField} from "@mui/material";
import {Attachment, Send} from "@mui/icons-material";
import React, {useRef, useState} from "react";
import FileUploader from "../../components/FileUploader";

function NewCommentWidget({theme,handleCommentSubmit}) {
    const [comment, setComment] = useState('');
    const [files, setFiles] = useState(null)
    const [showFile, setShowFile] = useState(null)
    const fileUploadRef = useRef();
    function handleSubmit(e) {
        handleCommentSubmit(comment,files);
    }
    async function handleOnChange(e) {

        setComment(e.target.value);
        console.log(e.target.value, comment)
    }
    function handleFileUpload(e) {
        const blobFile = URL.createObjectURL(e.target.files[0])
        setShowFile(blobFile)
        setFiles(e.target.files)
    }
    return (
        <><Box>
            <TextField
                fullWidth
                value={comment}
                onChange={handleOnChange}
                placeholder="Write a comment..."
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
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <FileUploader fileUploadHandler={handleFileUpload} fileUploadRef={fileUploadRef}/>
                            <IconButton  onClick={() => fileUploadRef.current.click()}>
                                <Attachment/>
                            </IconButton>
                            <IconButton onClick={handleSubmit}>
                                <Send/>
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </Box>
            <Box
                component="img"

            >

            </Box


            >
        </>
    )
}

export default NewCommentWidget