import { useEffect, useState } from "react";
import * as THREE from "three";
import useVideo from "./useVideo";

//   map: new THREE.VideoTexture(video),

export function useVideoTexture(videoId = "video") {
  const [videoTexture, setVideoTexture] = useState<THREE.VideoTexture>();

  const video = useVideo(videoId);
  useEffect(() => {
    if (video) {
      setVideoTexture(new THREE.VideoTexture(video));
    }
  }, [video]);

  return videoTexture;
}
