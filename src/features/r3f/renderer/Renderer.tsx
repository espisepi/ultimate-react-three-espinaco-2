import { Box, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { JSX } from "react";
import { Rollercoaster } from "../features/rollercoaster/Rollercoaster";
import { RollercoasterControls } from "../features/rollercoaster/controls/RollercoasterControls";


export const Renderer = (): JSX.Element | null => {
    return (
        <Canvas>
            <ambientLight />
            <Box material-color="#f00000" />

            {/* ========== Controls ========= */}
            <OrbitControls />
            {/* <RollercoasterControls /> */}

            <Rollercoaster />

        </Canvas>
    )
}
