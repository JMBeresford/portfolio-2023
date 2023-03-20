import { useState, useRef, useMemo, useCallback, useLayoutEffect } from "react";
import { useControls } from "leva";
import { randFloat } from "three/src/math/MathUtils";
import { createPortal, useFrame, useThree } from "@react-three/fiber";
import {
  BufferGeometry,
  Mesh,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
} from "three";
import {
  BaseIntersectionMetaBallsMaterial,
  IntersectionMetaBallsMaterial,
  MAX_SPHERES,
  MetaBallsMaterial,
} from "./shader";
import { PerformanceMonitor, useFBO } from "@react-three/drei";

type Props = {};

export default function MetaBalls(props: Props) {
  const ref = useRef<Mesh<BufferGeometry, ShaderMaterial>>();
  const lowResRef = useRef<Mesh<BufferGeometry, ShaderMaterial>>();
  const [count, setCount] = useState<number>(MAX_SPHERES);
  const [AO, setAO] = useState<number>(5);
  const [surfaceThreshold, setSurfaceThreshold] = useState<number>(0.005);
  const width = useThree(s => s.size.width);
  const height = useThree(s => s.size.height);
  const camera = useThree(s => s.camera);
  const envMap = useThree(s => s.scene.environment);
  const lowResTarget = useFBO(width / 12, height / 12, {
    depthBuffer: false,
    generateMipmaps: false,
  });

  const { envMapIntensity, mix, fov } = useControls("balls", {
    envMapIntensity: { value: 3, min: 0, max: 20, step: 0.01 },
    mix: { value: 0.67, min: 0, max: 2, step: 0.01 },
    fov: { value: 3, min: 0, max: 10, step: 0.01 },
  });

  const endOffsets: number[] = useMemo(() => {
    const arr = [];

    for (let i = 0; i < MAX_SPHERES; i++) {
      let x = randFloat(0.5, 1.75) * (Math.random() > 0.5 ? 1 : -1);
      let y = randFloat(0.5, 1.75) * (Math.random() > 0.5 ? 1 : -1);
      let z = randFloat(0.5, 1.75) * (Math.random() > 0.5 ? 1 : -1);
      arr.push(x, y, z);
    }

    return arr;
  }, []);

  const radii: number[] = useMemo(() => {
    const arr = [];

    for (let i = 0; i < MAX_SPHERES; i++) {
      arr.push(randFloat(0.15, 0.225));
    }

    return arr;
  }, []);

  const seeds = useMemo(() => {
    const arr = [];

    for (let i = 0; i < MAX_SPHERES; i++) {
      arr.push(randFloat(0, 100));
    }

    return arr;
  }, []);

  const speeds = useMemo(() => {
    const arr = [];

    for (let i = 0; i < MAX_SPHERES; i++) {
      arr.push(randFloat(0.5, 1));
    }

    return arr;
  }, []);

  const lowResScene = useMemo(() => {
    let scene = new Scene();

    return scene;
  }, []);

  const handleIncline = useCallback(() => {
    if (AO === 0) {
      setAO(5);
      return;
    }

    if (count >= MAX_SPHERES) return;

    setCount(p => p + 1);
  }, [count, AO]);

  const handleDecline = useCallback(() => {
    console.log("declined");
    if (surfaceThreshold < 0.02) {
      setSurfaceThreshold(p => p + 0.005);
      return;
    }

    if (count > 0) {
      setCount(p => Math.max(p - 3, 0));
      return;
    }

    if (AO === 0) return;

    setAO(0);
  }, [count, AO, surfaceThreshold]);

  useFrame(({ clock, gl }) => {
    if (ref.current) {
      ref.current.material.uniforms.uTime.value = clock.elapsedTime * 0.5;
    }

    if (camera && lowResScene && lowResTarget) {
      lowResRef.current.material.uniforms.uTime.value = clock.elapsedTime * 0.5;
      gl.setRenderTarget(lowResTarget);
      gl.render(lowResScene, camera);
      gl.setRenderTarget(null);
    }
  }, 4);

  return (
    <>
      {createPortal(
        <mesh ref={lowResRef}>
          <planeGeometry args={[2, 2]} />
          {/**@ts-ignore*/}
          <IntersectionMetaBallsMaterial
            uResolution={[width / 12, height / 12]}
            envMap={envMap}
            uMix={mix}
            uRadii={radii}
            uSeeds={seeds}
            // envMapIntensity={envMapIntensity}
            uEndOffsets={endOffsets}
            uFov={width > 768 ? fov : 2.5}
            uSpeeds={speeds}
            uCount={count}
            // uAO={AO}
          />
        </mesh>,

        lowResScene,
      )}
      <mesh ref={ref} renderOrder={5}>
        <planeGeometry args={[2, 2]} />
        {/**@ts-ignore*/}
        <MetaBallsMaterial
          uResolution={[width, height]}
          envMap={envMap}
          uMix={mix}
          uSurfaceThreshold={surfaceThreshold}
          uRadii={radii}
          uSeeds={seeds}
          envMapIntensity={envMapIntensity}
          uEndOffsets={endOffsets}
          uFov={width > 768 ? fov : 2.5}
          uSpeeds={speeds}
          uCount={count}
          uAO={AO}
          uLowRes={lowResTarget.texture}
        />
      </mesh>
      <PerformanceMonitor
        bounds={fps => (fps > 90 ? [50, 90] : [55, 60])}
        flipflops={5}
        onFallback={info => info.factor < 0.5 && handleDecline()}
        ms={100}
        iterations={5}
        // onIncline={handleIncline}
        onDecline={handleDecline}
      />
    </>
  );
}
