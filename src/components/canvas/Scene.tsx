import { Canvas } from "@react-three/fiber";
import { AdaptiveEvents, Preload, Stats } from "@react-three/drei";
import { ACESFilmicToneMapping, CineonToneMapping, Vector3 } from "three";
import { Camera } from "./Camera";
import { Suspense } from "react";
import { DepthOfField, EffectComposer, GodRays, SMAA } from "@react-three/postprocessing";
import { World } from "./World";
import { sphericalToCartesian } from "@/utils";
import { useStore } from "@/utils/state";

export default function Scene({ children, ...props }) {
  const sun = useStore(s => s.sun);
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
      <Stats className="statsPanel" />
      {/* <Suspense fallback={null}>
        <EffectComposer multisampling={4} disableNormalPass>
        </EffectComposer>
      </Suspense> */}
      <AdaptiveEvents />
      <Preload all />
    </Canvas>
  );
}
