import Navbar from "scenes/navbar"
import ProfileWidget from "../widgets/ProfileWidget";
import {FlexBetween} from "../../components/FlexBetween";
import {Box} from "@mui/material";
import NewPostWidget from "../widgets/NewPostWidget";
import AdWidget from "../widgets/AdWidget";
import FriendListWidget from "../widgets/FriendListWidget";
import PostsWidget from "../widgets/PostsWidget";

const HomePage = () => {
    return (<>
            <Navbar/>
            <Box width='100%'padding='1rem 3%'   gap='1rem'  display="flex" justifyContent="space-between"
            >
                <Box flexBasis={'25%'}>
                    <ProfileWidget />
                </Box>
                <Box display='flex' flexDirection='column' gap='1.5rem' flexBasis={'40%'}>
                    <NewPostWidget/>
                    <PostsWidget/>
                </Box>
                <Box display='flex' flexDirection='column' gap='1.5rem' flexBasis={'26%'}>
                    <AdWidget />
                    <FriendListWidget/>

                </Box>
            </Box>
        </>
    )
}

export default HomePage