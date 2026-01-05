import { JSX } from "react";


export const Video = (): JSX.Element | null => {
    return (
        <video
            // id="video"
            src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            style={{
                // display: "none",
            }}
            // playsInline
            loop
            crossOrigin="anonymous"
            controls={true}
            width={360}
            height={300}
            muted={false}
        ></video>
    )
}
