import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { BufferGeometry, Material, Mesh } from "three";

export function Cube() {
  const ref = useRef<Mesh<BufferGeometry, Material>>(undefined);

  useFrame(({ clock }) => {
    if (!ref.current) return;

    ref.current.rotation.x = clock.elapsedTime;
    ref.current.rotation.y = -clock.elapsedTime * 0.85;
  });
  return (
    <>
      <mesh ref={ref}>
        <boxBufferGeometry args={[1, 1, 1]} />
        <meshStandardMaterial metalness={1} roughness={0.2} color={"#666a8a"} depthWrite={false} />
      </mesh>
    </>
  );
}
