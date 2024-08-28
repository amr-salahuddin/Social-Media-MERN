import {Box, IconButton, Typography} from "@mui/material";
import React from "react";
import {FileCopy} from "@mui/icons-material";


const Other = ({src, alt}) => {
    return (
        <Box
            width="100%"
            borderRadius="0.5rem"
            mb={1}
        >
            <Typography> sa s{alt}</Typography>
            <IconButton
                component='a'
                href={src}
                download={alt}
            >
                <FileCopy/>
            </IconButton>
        </Box>
    );
};


export default Other