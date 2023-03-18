import { useMaxWidth } from "@/hooks/useMaxWidth";
import { Text } from "@react-three/drei";
import font from "@/assets/fonts/Montserrat-Light.ttf";
import type { Work } from "@/utils/store";
import { World } from "../World";
import { Cube } from "../Cube";

type Props = {
  work: Work;
};

export function WorkScene(props: Props) {
  const maxWidth = useMaxWidth();

  return (
    <>
      <World />
    </>
  );
}
