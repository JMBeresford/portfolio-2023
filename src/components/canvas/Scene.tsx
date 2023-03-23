import { Canvas, extend } from "@react-three/fiber";
import { AdaptiveEvents, Preload, Stats } from "@react-three/drei";
import { CineonToneMapping } from "three";
import MetaBalls from "./MetaBalls";
import { Camera } from "./Camera";
import { Suspense } from "react";
import { SMAAPass } from "three-stdlib";
import { EffectComposer, SMAA, Vignette } from "@react-three/postprocessing";
import { World } from "./World";

extend({ SMAAPass });

export default function Scene({ children, ...props }) {
  return (
    <Canvas
      {...props}
      gl={{ antialias: false, toneMapping: CineonToneMapping }}
      dpr={[1, 1.5]}
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
      {children}
      <World />
      <Camera />
      <Stats />
      <Suspense fallback={null}>
        <MetaBalls />
        <EffectComposer multisampling={0} disableNormalPass>
          <SMAA />
          <Vignette offset={0.4} darkness={0.5} eskil={true} />
        </EffectComposer>
      </Suspense>
      <AdaptiveEvents />
      <Preload all />
    </Canvas>
  );
}
