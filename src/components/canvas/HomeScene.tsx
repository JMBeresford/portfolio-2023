import { useMaxWidth } from "@/hooks/useMaxWidth";
import { World } from "./World";
import { Text } from "@react-three/drei";
import font from "@/assets/fonts/Montserrat-Light.ttf";
import font2 from "@/assets/fonts/Montserrat-Thin.ttf";

export function HomeScene() {
  const maxWidth = useMaxWidth();

  return (
    <>
      <group position={[-maxWidth / 2, -1.65, 0]} rotation-y={0}>
        <Text
          maxWidth={maxWidth}
          font={font}
          fontSize={0.6}
          anchorX="left"
          anchorY="bottom"
          fillOpacity={0.8}
        >
          John Beresford
        </Text>
        <Text maxWidth={maxWidth} font={font2} fontSize={0.35} anchorX="left" anchorY="top">
          creative developer
        </Text>
      </group>
      <World />
    </>
  );
}
