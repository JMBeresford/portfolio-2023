import { Points } from "@react-three/drei";
import { ParticlesMaterial, ParticlesMaterialProps } from "./shader";
import { useFrame } from "@react-three/fiber";
import { useLayoutEffect, useMemo, useRef } from "react";
import { BufferAttribute, BufferGeometry, Points as PointsType, Vector3 } from "three";

type Props = {
  count?: number;
  convergeTo: Vector3;
};

export function Particles(props: Props) {
  const ref = useRef<PointsType<BufferGeometry, ParticlesMaterialProps>>();
  const { count = 200, convergeTo } = props;

  const positions = useMemo(() => {
    let arr = [];

    for (let i = 0; i < count; i++) {
      arr.push(Math.random() * 500 - 250);
      arr.push(Math.random() * 300 - 150);
      arr.push(Math.random() * 500 - 250);
    }

    return new Float32Array(arr);
  }, [count]);

  const speeds = useMemo(() => {
    let arr = [];

    for (let i = 0; i < count; i++) {
      arr.push(Math.random() * 0.5 + 0.5);
    }

    return new Float32Array(arr);
  }, [count]);

  useLayoutEffect(() => {
    ref.current.geometry.setAttribute("aSpeed", new BufferAttribute(speeds, 1));
  }, [speeds]);

  useFrame(({ clock }) => {
    ref.current.material.uTime = clock.elapsedTime + 1000;
  });

  return (
    <Points ref={ref} positions={positions} renderOrder={15}>
      <ParticlesMaterial uConvergeTo={convergeTo.clone().multiplyScalar(5)} />
    </Points>
  );
}
