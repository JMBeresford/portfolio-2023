import { useMaxWidth } from "@/hooks/useMaxWidth";
import { useStore } from "@/utils/state";
import { Text as TextImpl } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { BufferGeometry, Material, Mesh } from "three";
import { damp } from "three/src/math/MathUtils";
import { useSpring, animated } from "@react-spring/three";

const Text = animated(TextImpl);

export default function HomeScene() {
  const headerRef = useRef<Mesh<BufferGeometry, Material>>();
  const subHeadRef = useRef<Mesh<BufferGeometry, Material>>();
  const colorScheme = useStore(s => s.colors.colorScheme);
  const font = "fonts/Montserrat-Light.ttf";
  const font2 = "fonts/Montserrat-ExtraLight.ttf";
  const maxWidth = useMaxWidth();
  const size = useThree(s => s.size);

  const { color } = useSpring({
    color: colorScheme === "dark" ? "white" : "black",
  });

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
          <animated.meshBasicMaterial color={color} opacity={0} />
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
          <animated.meshBasicMaterial color={color} opacity={0} />
        </Text>
      </group>
    </>
  );
}
