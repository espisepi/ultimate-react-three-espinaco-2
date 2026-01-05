import { useEffect, useState } from 'react';

export default function useVideo(videoId: string = 'video', interval: number = 100) {
    // Hacer un setInterval que finaliza hasta que encuentra el video
    const [video, setVideo] = useState<HTMLVideoElement | null>(null);
    
    useEffect(() => {
        const id_interval = setInterval(() => {
            const videoEl = document.getElementById(videoId) as HTMLVideoElement | null;
            if (videoEl && videoEl.videoWidth !== 0 && videoEl.videoHeight !== 0) {
                setVideo(videoEl);
                clearInterval(id_interval);
            }
        }, interval);

        return () => {
            clearInterval(id_interval);
        };
    }, [videoId, interval]);

    return video;
}
