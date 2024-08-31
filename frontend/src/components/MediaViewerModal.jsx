import {Box, IconButton, Modal} from "@mui/material";
import {ArrowLeft, ArrowRight, Close} from "@mui/icons-material";
import Media from "./Media/Media";
import React, {useEffect, useState} from "react";


function MediaViewer({index}) {


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
    )
}
export default MediaViewer