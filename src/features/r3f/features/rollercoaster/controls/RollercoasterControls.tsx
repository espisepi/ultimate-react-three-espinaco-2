import { useEffect, useRef, useState } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

interface RollercoasterControlsProps {
  name?: string;
  interval?: number;
}

export function RollercoasterControls({ name = "train", interval = 1 }: RollercoasterControlsProps): null {
  const { scene, camera } = useThree();
  const [train, setTrain] = useState<THREE.Object3D | undefined>(undefined);
  const trainRef = useRef<THREE.Object3D | null>(null);

  // 1 - Obtain the train from the scene
  useEffect(() => {
    const id_interval = setInterval(() => {
      const trainFound = scene.getObjectByName(name);
      if (trainFound) {
        clearInterval(id_interval);
        trainRef.current = trainFound;
        setTrain(trainFound);
      }
    }, interval);

    return () => clearInterval(id_interval);
  }, [name, interval, scene]);

  // 2 - Add/Remove the camera on the rollercoaster
  useEffect(() => {
    if (trainRef.current) {
      // Add the camera to the rollercoaster
      trainRef.current.add(camera);
    }
    return () => {
      if (trainRef.current) {
        // Remove the camera from the rollercoaster
        trainRef.current.remove(camera);
      }
    };
  }, [camera, train]);

  return null;
}
