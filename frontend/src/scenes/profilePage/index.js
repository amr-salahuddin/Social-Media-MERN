import { Box } from "@mui/material"
import { useParams } from "react-router-dom"
import Navbar from "scenes/navbar"
import AdWidget from "scenes/widgets/AdWidget"
import FriendListWidget from "scenes/widgets/FriendListWidget"
import NewPostWidget from "scenes/widgets/NewPostWidget"
import PostsWidget from "scenes/widgets/PostsWidget"
import ProfileWidget from "scenes/widgets/ProfileWidget"

const ProfilePage = () => {
    const username= useParams().username
    console.log(username)
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

export default ProfilePage