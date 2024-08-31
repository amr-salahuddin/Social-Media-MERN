import {Box} from "@mui/material";
import Media from "./Media/Media";
import React from "react";


function MediaGridViewer({media}) {
    const displayedMedia = media.slice(0, 4);
    const totalMedia = media.length;

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
                    const path = `${process.env.REACT_APP_BACKEND_BASE}/${file.path}`;

                    return (
                        <Box
                            key={index}
                            sx={{
                                position: 'relative',
                                overflow: 'hidden',
                                aspectRatio: '1/1', // Square aspect ratio for uniform tiles
                                display: 'flex', // Make the box a flexbox container
                                alignItems: 'center', // Vertically center
                                justifyContent: 'center', // Horizontally center

                            }}

                        >
                            {/* Render the media */}
                            {//center itself*/
                            }
                            <Media onClick={() => console.log('hi')} align file={file}/>

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
                                >
                                    +{totalMedia - 4}
                                </Box>
                            )}
                        </Box>
                    );
                })}
            </Box>
        </Box>
    )
}
export default MediaGridViewer