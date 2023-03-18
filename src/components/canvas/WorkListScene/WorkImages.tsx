import { store } from "@/utils/store";
import { WorkImage } from "./WorkImage";
import { Box } from "@react-three/flex";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { useMaxWidth } from "@/hooks/useMaxWidth";

export function WorkImages() {
  const camera = useThree(state => state.camera);
  const maxWidth = useMaxWidth();

  const dim = (maxWidth / 2) * 0.95;
  const gap = maxWidth * 0.05;

  useEffect(() => {
    camera.position.set(0, 0, 5);
  }, [camera]);

  const images = Object.entries(store.works).map(([name, data]) => ({
    name,
    image: data.images[0],
  }));

  return (
    <>
      {images.map(({ name, image }) => (
        <Box key={name} centerAnchor marginBottom={gap} width={dim} height={dim}>
          <WorkImage name={name} image={image} />
        </Box>
      ))}
    </>
  );
}
