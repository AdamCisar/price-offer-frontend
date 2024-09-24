import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import { useEffect, useRef } from 'react';

const ResizeWindow = () => {
    const documentElement = useRef(document.documentElement);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            enterFullscreen();
        } else {
            exitFullscreen();
        }
    };

    const enterFullscreen = () => {
        if (documentElement.current.requestFullscreen) {
            documentElement.current.requestFullscreen();
        } else if (documentElement.current.msRequestFullscreen) {
            documentElement.current.msRequestFullscreen();
        } else if (documentElement.current.mozRequestFullScreen) {
            documentElement.current.mozRequestFullScreen();
        } else if (documentElement.current.webkitRequestFullscreen) {
            documentElement.current.webkitRequestFullscreen();
        }
    };

    const exitFullscreen = () => {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen(); 
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen(); 
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen(); 
        }
    };

    return (
        <AspectRatioIcon sx={{ fontSize: 30, cursor: 'pointer' }} onClick={() => toggleFullscreen()}/>
    )
}

export default ResizeWindow