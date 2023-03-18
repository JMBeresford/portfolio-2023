import { Text } from "@react-three/drei";
import { WorkImages } from "./WorkImages";
import { useMaxWidth } from "@/hooks/useMaxWidth";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { BufferGeometry, Group, Material, Mesh } from "three";
import { World } from "../World";
import { ThreeEvent, useFrame, useThree } from "@react-three/fiber";
import { clamp, damp } from "three/src/math/MathUtils";
import { Flex } from "@react-three/flex";

export function WorkListScene() {
  const font = "fonts/Montserrat-ExtraLight.ttf";
  const maxWidth = useMaxWidth();
  const camera = useThree(s => s.camera);
  const textRef = useRef<Mesh<BufferGeometry, Material>>();
  const groupRef = useRef<Group>();
  const wrapperRef = useRef<Group>();
  const scrollRef = useRef<number>(0);
  const [height, setHeight] = useState<number>(0);

  const handleScroll = useCallback(
    (e: ThreeEvent<WheelEvent>) => {
      scrollRef.current += e.deltaY * 0.01;

      scrollRef.current = clamp(scrollRef.current, 0, height);
    },
    [height],
  );

  useLayoutEffect(() => {
    camera.add(wrapperRef.current);
  }, [camera]);

  useFrame(({ mouse }, delta) => {
    if (!groupRef.current || !textRef.current) return;
    groupRef.current.position.y = damp(groupRef.current.position.y, scrollRef.current, 12, delta);

    textRef.current.position.y = damp(
      textRef.current.position.y,
      0.25 + mouse.y * 0.25,
      0.5,
      delta,
    );
    textRef.current.position.x = damp(textRef.current.position.x, mouse.x * 0.25, 0.5, delta);
  });

  return (
    <>
      <World onWheel={handleScroll} />
      <group ref={wrapperRef} position={[0, -0.5, -5]}>
        <group position={[-maxWidth / 2, 0.5, -0.05]}>
          <Text
            ref={textRef}
            font={font}
            fontSize={1.55}
            anchorY="bottom"
            anchorX="left"
            renderOrder={2}
          >
            WORK
            <meshBasicMaterial color="#ffffff" opacity={0.6} depthTest={false} />
          </Text>
        </group>

        <group ref={groupRef}>
          <Flex
            onReflow={(_, h) => setHeight(h)}
            position={[-maxWidth / 2, 0, 0]}
            dir="row"
            wrap="wrap"
            justifyContent={"space-between"}
            width={maxWidth}
          >
            <WorkImages />
          </Flex>
        </group>
      </group>
    </>
  );
}
