import {Box} from "@mui/material";
import React from "react";


const Video = ({src, alt}) => {
    return (
        <Box
            component="video"
            src={src}
            controls
            alt={alt}
            width="100%"
            borderRadius="0.5rem"
            mb={1}
        />
    );
};


export default Video