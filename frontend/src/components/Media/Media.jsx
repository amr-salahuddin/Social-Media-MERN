import Image from "./Image";
import Video from "./Video";
import Other from "./Other";


const Media = ({file}) => {

    let {path, originalname, mimetype} = file;
    path = `${process.env.REACT_APP_BACKEND_BASE}/${path}`
    const fileType = mimetype.split('/')[0];
    if(fileType == 'image') {
        return (
            <Image src={path} alt={originalname}/>
        )

    }
    else if(fileType == 'video'){
        return(
            <Video src={path} alt={originalname}/>
        )
    }
    else{
        return (
            <Other src={path} alt ={originalname}/>
        )
    }
}

export default Media
