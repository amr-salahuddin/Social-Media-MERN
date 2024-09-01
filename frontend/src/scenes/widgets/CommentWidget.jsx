import {Avatar, Box, IconButton, Menu, MenuItem, Typography} from "@mui/material";
import React, {useState} from "react";
import {MoreHoriz, MoreHorizSharp, MoreHorizTwoTone} from "@mui/icons-material";
import {useSelector} from "react-redux";
import Media from "../../components/Media/Media";
import MediaGrid from "../../components/MediaGrid";


function Comment({comment, handleCommentDelete, handleCommentEdit}) {
    const [anchorEl, setAnchorEl] = useState(null)
    const isMenuOpen = Boolean(anchorEl);
    const id = useSelector((state) => state.user._id)
    const isMyComment = comment.user._id == id
    const host =`${process.env.REACT_APP_BACKEND_BASE}`

    function handleMenuOpen(e) {
        setAnchorEl(e.currentTarget);
    }

    function handleMenuClose(e) {
        setAnchorEl(null);
    }

    function handleDelete(e) {
        handleCommentDelete(comment._id)
    }


    return (
        <React.Fragment key={comment._id}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Box display="flex" alignItems="center">
                    <Avatar src={comment.user.pictureUrl}/>
                    <Box ml={2}>
                        <Typography fontWeight="bold">{comment.user.firstName}</Typography>
                        <Typography variant="body2" color="textSecondary">
                            {comment.createdAt}
                        </Typography>

                    </Box>
                </Box>

                <Menu
                    anchorEl={anchorEl}
                    open={isMenuOpen}
                    onClose={handleMenuClose}
                    disableScrollLock
                >
                    {isMyComment && <MenuItem onClick={handleDelete}>Edit</MenuItem>}
                    {isMyComment && <MenuItem onClick={handleDelete}>Delete</MenuItem>}
                    {!isMyComment && <MenuItem>Report</MenuItem>}

                </Menu>
                <IconButton onClick={handleMenuOpen}
                >
                    <MoreHorizSharp/>
                </IconButton>
            </Box>
            <Typography fontWeight="bold" color="textSecondary">
                {comment.comment}
            </Typography>
            <MediaGrid media={comment.media} host={host}/>
            <Box display="flex" justifyContent="space-between" alignItems="center" mt={1} mb={1}>
                <Typography variant="body2">
                   0 Likes
                </Typography>
                <Typography variant="body2">
                   0 Replies 
                </Typography>
            </Box>
        </React.Fragment>
    )
}


export default Comment