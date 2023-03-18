import { useMaxWidth } from "@/hooks/useMaxWidth";
import { World } from "./World";
import { Text } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

export default function HomeScene() {
  const font = "fonts/Montserrat-Light.ttf";
  const font2 = "fonts/Montserrat-Thin.ttf";
  const maxWidth = useMaxWidth();
  const size = useThree(s => s.size);

  return (
    <>
      <group position={[-maxWidth / 2, -1.65, 0]} rotation-y={0}>
        <Text
          maxWidth={maxWidth}
          font={font}
          fontSize={size.width > 768 ? 0.6 : 0.4}
          anchorX="left"
          anchorY="bottom"
          fillOpacity={0.8}
        >
          John Beresford
        </Text>
        <Text
          maxWidth={maxWidth}
          font={font2}
          fontSize={size.width > 768 ? 0.35 : 0.2}
          anchorX="left"
          anchorY="top"
        >
          creative developer
        </Text>
      </group>
      <World />
    </>
  );
}
