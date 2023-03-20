import { store } from "@/utils/store";
import { Environment, GradientTexture } from "@react-three/drei";
import { useControls } from "leva";
import colors from "nice-color-palettes/1000.json";
import { BackSide, Group } from "three";

export function World(props: JSX.IntrinsicElements["mesh"]) {
  let colors = store.colorsDark;
  const palette = colors[Math.floor(Math.random() * colors.length)];

  const stops = palette.map((_, index) => index / (palette.length - 1));

  return (
    <>
      <Environment frames={1} background blur={1}>
        <mesh
          // onClick={() => console.log(palette)}
          rotation-z={-0.5}
          {...props}
        >
          <sphereBufferGeometry args={[10, 32, 32]} />
          <meshBasicMaterial toneMapped={false} side={BackSide}>
            <GradientTexture stops={stops} colors={palette} />
          </meshBasicMaterial>
        </mesh>
      </Environment>
    </>
  );
}
