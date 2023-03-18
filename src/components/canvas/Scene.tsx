import { Canvas, extend } from "@react-three/fiber";
import { Preload, Stats } from "@react-three/drei";
import { ACESFilmicToneMapping, CineonToneMapping, LinearEncoding } from "three";
import MetaBalls from "./MetaBalls";
import { Camera } from "./Camera";
import { Suspense } from "react";
import { SMAAPass } from "three-stdlib";
import { EffectComposer, SMAA } from "@react-three/postprocessing";

extend({ SMAAPass });

export default function Scene({ children, ...props }) {
  return (
    <Canvas
      {...props}
      gl={{ antialias: true, toneMapping: CineonToneMapping }}
      style={{ pointerEvents: "none", touchAction: "none", zIndex: 5 }}
      camera={null}
    >
      {children}
      <MetaBalls />
      <Camera />
      <Stats />
      <Suspense fallback={null}>
        <EffectComposer multisampling={0} disableNormalPass>
          <SMAA />
        </EffectComposer>
      </Suspense>
      <Preload all />
    </Canvas>
  );
}
