import React, { useEffect, useRef, useState } from "react";



const VideoPreview = ({ stream }: { stream: MediaStream | null }) => {
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream])

    if (!stream) {
        return null;
    }

    return <video height={500} width={500} ref={videoRef} autoPlay controls />


}

export default VideoPreview




