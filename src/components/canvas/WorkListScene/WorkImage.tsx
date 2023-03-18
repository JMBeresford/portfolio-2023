import { Image as Img, useCursor, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useFlexSize } from "@react-three/flex";
import { useRouter } from "next/router";
import { useLayoutEffect, useRef, useState } from "react";
import { BufferGeometry, Material, Mesh } from "three";
import { damp } from "three/src/math/MathUtils";

export function WorkImage({ name, image }: { name: string; image: string }) {
  const router = useRouter();
  const ref = useRef<Mesh<BufferGeometry, Material>>();
  const [hovering, setHovering] = useState<boolean>(false);
  const [w, h] = useFlexSize();
  const texture = useTexture(image);
  const scale = hovering ? 1.1 : 1;

  useCursor(hovering);

  useLayoutEffect(() => {
    ref.current.material.depthTest = false;
  });

  useFrame((_, delta) => {
    if (!ref.current) return;
    let scaleX = w * scale;
    let scaleY = h * scale;

    ref.current.scale.x = damp(ref.current.scale.x, scaleX, 8, delta);
    ref.current.scale.y = damp(ref.current.scale.y, scaleY, 8, delta);
  });

  return (
    <Img
      ref={ref}
      renderOrder={100}
      onClick={() => router.push(`/work/${name}`)}
      onPointerEnter={() => setHovering(true)}
      onPointerLeave={() => setHovering(false)}
      name={name}
      texture={texture}
      toneMapped={false}
      transparent={true}
    />
  );
}
