import {Box} from "@mui/material";
import React from "react";


const Image = ({src, alt}) => {
    return (
        <Box
            component="img"
            src={src}

            alt={alt}
            width="100%"
            borderRadius="0.5rem"
            mb={1}
        />
    );
};


export default Image