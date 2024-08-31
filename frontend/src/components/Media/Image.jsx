import {Box} from "@mui/material";
import React from "react";


const Image = (props) => {
    const {src, alt} = props
    return (
        <Box
            component="img"
            src={src}

            alt={alt}
            width={'100%'}
            maxHeight={300}
            {...props}
            borderRadius="0.5rem"
            mb={1}
        />
    );
};


export default Image