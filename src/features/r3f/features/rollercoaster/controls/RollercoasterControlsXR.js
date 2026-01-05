import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { XROrigin } from "@react-three/xr";

export function RollercoasterControlsXR({
  name = "train",
  interval = 1,
}) {

  // define attributes XR ========

  // const leftController = useXRControllerState("left");
  // const rightController = useXRControllerState("right");

  const ref = useRef(null);


  // 1 - obtener de la scene el train
  const { scene } = useThree();
  const [train, setTrain] = useState(); /* train: THREE.Object3D */
  const trainRef = useRef(); /* train: THREE.Object3D */
  useEffect(() => {
    const id_interval = setInterval(() => {
      const trainFinded = scene.getObjectByName(name);
      if (trainFinded) {
        clearInterval(id_interval);
        trainRef.current = trainFinded;
        setTrain((v) => trainFinded);
      }
    }, interval);
  }, [name]);

  // 2 - Poner/Quitar la camara en el rollercoaster
  useEffect(() => {
    if (trainRef.current && ref.current) {
      // Poner la camara en el rollercoaster
      trainRef.current.add(ref.current);
    }
    return () => {
      if (trainRef.current && ref.current) {
        // Quitar la camara del rollercoaster
        trainRef.current.remove(ref.current);
      }
    };
  }, [trainRef.current, train, ref.current]);

  return <XROrigin ref={ref} />;
}

// train.add(ref.current); // para poner la camara en el rollercoaster
// train.remove(ref.current); // para quitar la camara del rollercoaster
