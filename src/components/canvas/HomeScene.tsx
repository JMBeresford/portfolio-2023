import { useMaxWidth } from "@/hooks/useMaxWidth";
import { World } from "./World";
import { Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { BufferGeometry, Material, Mesh } from "three";
import { damp } from "three/src/math/MathUtils";

export default function HomeScene() {
  const headerRef = useRef<Mesh<BufferGeometry, Material>>();
  const subHeadRef = useRef<Mesh<BufferGeometry, Material>>();
  const font = "fonts/Montserrat-Light.ttf";
  const font2 = "fonts/Montserrat-Thin.ttf";
  const maxWidth = useMaxWidth();
  const size = useThree(s => s.size);

  useFrame((_, delta) => {
    if (headerRef.current) {
      headerRef.current.material.opacity = damp(headerRef.current.material.opacity, 0.8, 1, delta);
    }
    if (subHeadRef.current && headerRef.current?.material.opacity >= 0.6) {
      subHeadRef.current.material.opacity = damp(subHeadRef.current.material.opacity, 1, 1, delta);
    }
  });

  return (
    <>
      <group position={[-maxWidth / 2, -1.65, 0]} rotation-y={0}>
        <Text
          ref={headerRef}
          maxWidth={maxWidth}
          font={font}
          fontSize={size.width > 768 ? 0.6 : 0.4}
          anchorX="left"
          anchorY="bottom"
        >
          John Beresford
          <meshBasicMaterial color="white" opacity={0} />
        </Text>
        <Text
          ref={subHeadRef}
          maxWidth={maxWidth}
          font={font2}
          fontSize={size.width > 768 ? 0.35 : 0.2}
          anchorX="left"
          anchorY="top"
        >
          creative developer
          <meshBasicMaterial color="white" opacity={0} />
        </Text>
      </group>
      <World />
    </>
  );
}
