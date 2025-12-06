import { Box, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { JSX } from "react";


export const Renderer = (): JSX.Element | null => {
    return (
        <Canvas>
            <Box material-color="#f00000" />
            <OrbitControls />
        </Canvas>
    )
}
