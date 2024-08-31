import Image from "./Image";
import Video from "./Video";
import Other from "./Other";
import {Box} from "@mui/material";


const Media = (props) => {

    const {file, host} = props;
    let {path, originalname, mimetype} = file;
    if (host)
        path = `${host}/${path}`
    const fileType = mimetype.split('/')[0];
    if (fileType == 'image') {
        return (
            <Image  {...props} src={path} alt={originalname}/>
        )

    } else if (fileType == 'video') {
        return (
            <Video {...props} src={path} alt={originalname}/>
        )
    } else {
        return (
            <Other src={path} alt={originalname}/>
        )
    }
}

export default Media
