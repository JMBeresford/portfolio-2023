import { Text } from "@react-three/drei";
import { useRef } from "react";
import { BufferGeometry, Group, Material, Mesh } from "three";
import { World } from "../World";
import { useMaxWidth } from "@/hooks/useMaxWidth";
import { useFrame, useThree } from "@react-three/fiber";
import { clamp, damp } from "three/src/math/MathUtils";

export function WorkListScene() {
  const font = "fonts/Montserrat-ExtraLight.ttf";
  const textRef = useRef<Mesh<BufferGeometry, Material>>();
  const maxWidth = useMaxWidth();
  const size = useThree(s => s.size);
  const mobile = size.width <= 768;

  useFrame(({ clock }, delta) => {
    if (textRef.current) {
      textRef.current.material.opacity = damp(textRef.current.material.opacity, 0.25, 1, delta);
    }
  });

  return (
    <>
      <World />
      <group position={[mobile ? 0 : -maxWidth / 2, mobile ? 0.85 : 0.5, -1]}>
        <Text
          ref={textRef}
          font={font}
          fontSize={clamp(0.9, 0.5 + size.width * 0.0005, 1.6)}
          anchorY="bottom"
          anchorX={mobile ? "center" : "left"}
          renderOrder={2}
        >
          WORK
          <meshBasicMaterial color="white" opacity={0} />
        </Text>
      </group>
    </>
  );
}
