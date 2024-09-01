import {Box, IconButton, InputAdornment, TextField} from "@mui/material";
import {Attachment, Send} from "@mui/icons-material";
import React, {useRef, useState} from "react";
import FileUploader from "../../components/FileUploader";
import MediaGrid from "components/MediaGrid";

function NewCommentWidget({theme,handleCommentSubmit}) {
    const [comment, setComment] = useState('');
    const [files, setFiles] = useState(null)
    const [showFiles, setShowFiles] = useState(null)
    const fileUploadRef = useRef();
    function handleSubmit(e) {
        handleCommentSubmit(comment,files);
        setShowFiles(null);
        setFiles(null)
    }


    async function handleOnChange(e) {

        setComment(e.target.value);
        console.log(e.target.value, comment)
    }
    function handleFileUpload(event) {
        const tempShowFiles = [];
        for (let i = 0; i < event.target.files.length; i++) {

            const file = event.target.files[i];

            console.log(file, 'sxs')
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
        console.log('xx', tempShowFiles, showFiles)
        setFiles(event.target.files);
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
         {showFiles && <MediaGrid media={showFiles}/>}
        </>
    )
}

export default NewCommentWidget