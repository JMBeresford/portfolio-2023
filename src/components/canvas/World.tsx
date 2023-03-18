import { store } from "@/utils/store";
import { Environment, GradientTexture } from "@react-three/drei";
import { useControls } from "leva";
import colors from "nice-color-palettes/1000.json";
import { BackSide, Group } from "three";

export function World(props: JSX.IntrinsicElements["mesh"]) {
  // const palette = colors[Math.floor(Math.random() * colors.length)];
  // let index1 = Math.floor(Math.random() * palette.length);
  // let index2 = Math.floor(Math.random() * palette.length);

  // if (index2 === index1) {
  //   index2 = (index2 + 1) % palette.length;
  // }

  const colors = store.colorsDark[Math.floor(Math.random() * store.colorsDark.length)];

  const { color, skyColor1, skyColor2 } = useControls("world", {
    color: "#ffffff",
    // skyColor1: "#0f006f",
    // skyColor2: "#580000",
    // skyColor1: palette[index1],
    // skyColor2: palette[index2],
    skyColor1: colors[0],
    skyColor2: colors[1],
  });

  return (
    <>
      <Environment frames={1} background blur={0}>
        <mesh
          {...props}
          // onClick={() => {
          //   console.log(skyColor1, skyColor2);
          // }}
        >
          <sphereBufferGeometry args={[10, 32, 32]} />
          <meshBasicMaterial toneMapped={false} side={BackSide}>
            <GradientTexture stops={[0, 1]} colors={[skyColor1, skyColor2]} />
          </meshBasicMaterial>
        </mesh>
      </Environment>
    </>
  );
}
