import { Canvas } from "@react-three/fiber";
import { AdaptiveEvents, Preload, Stats } from "@react-three/drei";
import { ACESFilmicToneMapping, CineonToneMapping, Vector3 } from "three";
import { Camera } from "./Camera";
import { MutableRefObject, Suspense, useEffect, useState } from "react";
import { DepthOfField, EffectComposer, GodRays, SMAA } from "@react-three/postprocessing";
import { World } from "./World";
import { sphericalToCartesian } from "@/utils";
import { useStore } from "@/utils/state";

type Props = {
  eventSource: MutableRefObject<HTMLDivElement>;
};

export default function Scene({ eventSource }: Props) {
  const [debug, setDebug] = useState<boolean>(false);

  useEffect(() => {
    if (window?.location.hash.includes("debug")) {
      setDebug(true);
    }
  }, []);

  return (
    <Canvas
      eventSource={eventSource}
      eventPrefix="client"
      gl={{ toneMapping: ACESFilmicToneMapping, antialias: true, logarithmicDepthBuffer: true }}
      dpr={[1, 2]}
      style={{
        pointerEvents: "none",
        touchAction: "none",
        overflow: "hidden",
        zIndex: 5,
        position: "fixed",
        inset: 0,
      }}
    >
      <World />
      <Camera />
      {debug && <Stats className="statsPanel" />}
      {/* <Suspense fallback={null}>
        <EffectComposer multisampling={4} disableNormalPass>
        </EffectComposer>
      </Suspense> */}
      <AdaptiveEvents />
      <Preload all />
    </Canvas>
  );
}
