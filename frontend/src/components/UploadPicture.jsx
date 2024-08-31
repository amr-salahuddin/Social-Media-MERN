import Dropzone from "react-dropzone";
import {Box, Typography} from "@mui/material";
import React from "react";


export default function UploadPicture({handleDrop, selectedFile, theme}) {
    <Box p='1rem' border='1px solid grey'>
        <Dropzone onDrop={handleDrop}>
            {({getRootProps, getInputProps, isDragActive}) => (
                <Box {...getRootProps()}
                     sx={{
                         border: `2px dashed ${theme.palette.primary.main}`,
                         p: '1rem',
                         '&:hover': {cursor: 'pointer'},
                     }}>
                    <input {...getInputProps()} />
                    {!selectedFile && (
                        isDragActive ? (
                            <Typography>Drop the files here ...</Typography>
                        ) : (
                            <Typography>Drag 'n' drop a picture here, or click to select a file</Typography>
                        )
                    )}
                    {selectedFile && (
                        <Typography variant="body2">
                            {selectedFile.name}
                        </Typography>
                    )}
                </Box>
            )}
        </Dropzone>
    </Box>
}