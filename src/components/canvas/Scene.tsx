import { Canvas } from "@react-three/fiber";
import { AdaptiveEvents, Preload, Stats } from "@react-three/drei";
import { ACESFilmicToneMapping, CineonToneMapping } from "three";
import { Camera } from "./Camera";
import { Suspense } from "react";
import { EffectComposer, SMAA } from "@react-three/postprocessing";
import { World } from "./World";

export default function Scene({ children, ...props }) {
  return (
    <Canvas
      {...props}
      gl={{ toneMapping: ACESFilmicToneMapping, antialias: true, logarithmicDepthBuffer: true }}
      dpr={[1, 2]}
      style={{
        pointerEvents: "none",
        touchAction: "none",
        overflow: "hidden",
        zIndex: 5,
        position: "fixed",
        top: "5vh",
        left: 0,
        right: 0,
        height: "90%",
        maxHeight: "90%",
      }}
    >
      <World />
      <Camera />
      {children}
      <Stats />
      <Suspense fallback={null}>
        {/* <EffectComposer multisampling={4} disableNormalPass>
          <SMAA />
        </EffectComposer> */}
      </Suspense>
      <AdaptiveEvents />
      <Preload all />
    </Canvas>
  );
}
