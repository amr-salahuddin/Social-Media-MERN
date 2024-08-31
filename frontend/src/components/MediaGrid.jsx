import {Box, IconButton, Modal, useTheme} from "@mui/material";
import Media from "./Media/Media";
import React, {useEffect, useState} from "react";
import {ArrowCircleLeftOutlined, ArrowLeft, ArrowLeftOutlined, ArrowRight, Close} from "@mui/icons-material";
import MediaViewerModal from "./MediaViewerModal";


function MediaGrid({media, host}) {


    console.log(media);
    const displayedMedia = media.slice(0, 4);
    const totalMedia = media.length;

    const theme = useTheme();
    const primary = theme.palette.primary.main;
    const [open, setOpen] = useState(false)
    const [index, setIndex] = useState(0)

    function handleOpen(index) {
        setOpen(true)
        setIndex(index)
        console.log(open);
    }

    function handlePrevious() {

        if (index > 0) {
            setIndex((prev) => prev - 1)
        }
    }

    function handleNext() {
        if (index < totalMedia - 1) {
            setIndex((prev) => prev + 1)
        }
    }
    function handleClose() {
        setOpen(false)
    }

    return (
        <Box>
            <Box
                sx={{
                    display: 'grid',
                    gap: '8px',
                    gridTemplateColumns: `repeat(${Math.min(displayedMedia.length, 2)}, 1fr)`, // 1fr means equal distribution
                    gridTemplateRows: `repeat(${Math.ceil(displayedMedia.length / 2)}, auto)`,
                }}
            >
                {displayedMedia.map((file, index) => {

                    return (
                        <Box
                            key={index}
                            sx={{
                                position: 'relative',
                                overflow: 'hidden',
                                display: 'flex', // Make the box a flexbox container
                                alignItems: 'center', // Vertically center
                                justifyContent: 'center', // Horizontally center

                            }}

                        >
                            {/* Render the media */}
                            {//center itself*/
                            }
                            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} height="100%"
                                 width="100%" onClick={() => handleOpen(index)}>
                                <Media host={host} height='100%' file={file}/>
                            </Box>
                            {/* Display +X overlay on the last item if there are more than 4 */}
                            {index === 3 && totalMedia > 4 && (
                                <Box

                                    sx={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#fff',
                                        fontSize: '2rem',
                                        fontWeight: 'bold',
                                    }}
                                    onClick={(() => handleOpen(index))}
                                >
                                    +{totalMedia - 4}
                                </Box>
                            )}
                        </Box>
                    );
                })}
            </Box>
            <MediaViewerModal host={host} open={open} handleClose={handleClose} media={media} totalMedia={totalMedia}  handleNext={handleNext} handlePrevious={handlePrevious} index={index}/>
        </Box>
    )
}

export default MediaGrid