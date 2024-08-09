import Navbar from "scenes/navbar"
import ProfileWidget from "../widgets/ProfileWidget";
import {FlexBetween} from "../../components/FlexBetween";
import {Box} from "@mui/material";
import NewPostWidget from "../widgets/NewPostWidget";
import AdWidget from "../widgets/AdWidget";
import FriendListWidget from "../widgets/FriendListWidget";
import PostsWidget from "../widgets/PostsWidget";
const samplePosts = [
    {
        id: 1,
        userName: 'John Doe',
        userAvatar: 'https://via.placeholder.com/50',
        date: 'August 10, 2024',
        description: 'Just had an amazing day at the park!',
        mediaUrl: 'https://via.placeholder.com/300',
        likes: 120,
        shares: 10,
        comments: [
            { userName: 'Jane Smith', text: 'Looks like fun!' },
            { userName: 'Bob Johnson', text: 'Great picture!' },
        ],
    },
    {
        id: 2,
        userName: 'Jane Smith',
        userAvatar: 'https://via.placeholder.com/50',
        date: 'August 8, 2024',
        description: 'My latest design project.',
        mediaUrl: 'https://via.placeholder.com/300',
        likes: 90,
        shares: 15,
        comments: [
            { userName: 'John Doe', text: 'Awesome work!' },
        ],
    },
];

const HomePage = () => {
    return (<>

            <Navbar/>
            <Box width='100%'padding='2rem 6%'   gap='1rem'  display="flex" justifyContent="space-between"
            >
                <Box flexBasis={'25%'}>
                    <ProfileWidget />
                </Box>
                <Box display='flex' flexDirection='column' gap='1.5rem' flexBasis={'35%'}>
                    <NewPostWidget />
                    <PostsWidget posts={samplePosts}/>
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