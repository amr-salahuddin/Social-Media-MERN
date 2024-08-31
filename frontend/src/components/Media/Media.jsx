import Image from "./Image";
import Video from "./Video";
import Other from "./Other";
import {Box} from "@mui/material";


const Media = (props) => {

    const {file} = props;
    let {path, originalname, mimetype} = file;
    path = `${process.env.REACT_APP_BACKEND_BASE}/${path}`
    const fileType = mimetype.split('/')[0];
    if(fileType == 'image') {
        return (
            <Box  {...props} >
            <Image   src={path} alt={originalname}/>
            </Box>
        )

    }
    else if(fileType == 'video'){
        return(
            <Video {...props} src={path} alt={originalname}/>
        )
    }
    else{
        return (
            <Other src={path} alt ={originalname}/>
        )
    }
}

export default Media
