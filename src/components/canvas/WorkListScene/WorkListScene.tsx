import { Text } from "@react-three/drei";
import { useRef } from "react";
import { BufferGeometry, Group, Material, Mesh } from "three";
import { useMaxWidth } from "@/hooks/useMaxWidth";
import { useFrame, useThree } from "@react-three/fiber";
import { clamp, damp } from "three/src/math/MathUtils";
import { useStore } from "@/utils/state";
import { animated, useSpring } from "@react-spring/three";

export default function WorkListScene() {
  const font = "fonts/Montserrat-Light.ttf";
  const textRef = useRef<Mesh<BufferGeometry, Material>>();
  const colorScheme = useStore(s => s.colors.colorScheme);
  const maxWidth = useMaxWidth();
  const size = useThree(s => s.size);
  const mobile = size.width <= 768;

  const { color } = useSpring({
    color: colorScheme === "dark" ? "white" : "black",
  });

  useFrame((_, delta) => {
    if (textRef.current) {
      textRef.current.material.opacity = damp(
        textRef.current.material.opacity,
        mobile ? 0.5 : 0.15,
        1,
        delta,
      );
    }
  });

  return (
    <>
      <group position={[0, 1.35, -5]}>
        {/* <Text
          ref={textRef}
          font={font}
          fontSize={clamp(0.775, 0.5 + size.width * 0.0005, 1.6) * 2.5}
          anchorY="middle"
          anchorX="center"
          renderOrder={2}
        >
          WORK
          <animated.meshStandardMaterial color={color} opacity={0} />
        </Text> */}
      </group>
    </>
  );
}
