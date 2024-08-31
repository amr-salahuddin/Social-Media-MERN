import {Box, IconButton, Modal, useTheme} from "@mui/material";
import Media from "./Media/Media";
import React, {useEffect, useState} from "react";
import {ArrowCircleLeftOutlined, ArrowLeft, ArrowLeftOutlined, ArrowRight, Close} from "@mui/icons-material";


function MediaGridViewer({media, host}) {




    console.log(media);
    const displayedMedia = media.slice(0, 4);
    const totalMedia = media.length;

    const [open, setOpen] = useState(false)
    const [index, setIndex] = useState(0)
    const theme = useTheme();
    const primary = theme.palette.primary.main;




    useEffect(() => {


        if (!open) return

        function handleKeyDown(e) {

            if (e.key === 'ArrowRight') {

                handleNext()
            } else if (e.key === 'ArrowLeft') {
                handlePrevious()
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [open, index])

    function handleClose() {
        setOpen(false)
    }

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

    const displayArrowRight = index < totalMedia - 1 ? 'visible' : 'hidden';
    const displayArrowLeft = index === 0 ? 'hidden' : 'visible'
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

                <Modal open={open} onClose={handleClose}
                       sx={{
                           userSelect: 'none',
                           display: 'flex',
                           alignItems: 'center',
                           justifyContent: 'center',
                           '& .MuiBackdrop-root': {backdropFilter: 'blur(4px)', backgroundColor: 'rgba(0, 0, 0, 0.95)'},
                       }}>
                    <Box sx={{
                        width: '80%',
                        height: '80%',
                        maxWidth: '900px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        outline: 'none',  // Prevents the focus outline

                    }}>

                        <IconButton sx={{position: 'absolute', top: 0, left: 0}} onClick={handleClose}>
                            {/*make color red*/}
                            <Close color='error'/>

                        </IconButton>


                        <IconButton sx={{height: '100%', visibility: `${displayArrowLeft}`}}
                                    onClick={() => setIndex(index - 1)}>
                            <ArrowLeft color='primary' sx={{fontSize: 48}}/>

                        </IconButton>

                        <Box sx={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'rgba(0, 0, 0, 0.5)',
                        }}>
                            <Media host={host} sx={{maxWidth: '100%', maxHeight: '100%', objectFit: 'contain'}}
                                   file={media[index]}/>
                        </Box>
                        <IconButton onClick={() => setIndex(index + 1)}
                                    sx={{height: '100%', visibility: `${displayArrowRight}`}}>
                            <ArrowRight color='primary' sx={{fontSize: 48}}/>
                        </IconButton>
                    </Box>
                </Modal>
            </Box>
        </Box>
    )
}

export default MediaGridViewer