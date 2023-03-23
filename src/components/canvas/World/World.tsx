import { useStore } from "@/utils/state";
import { Environment, GradientTexture } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";
// import { useControls } from "leva";
// import colors from "nice-color-palettes/1000.json";
import { BackSide, BufferGeometry, Color, Mesh, ShaderMaterial } from "three";
import { WorldMaterial } from "./shader";
import { useFrame } from "@react-three/fiber";

const colorsDark = useStore.getState().colors.colorsDark;
const colorsLight = useStore.getState().colors.colorsLight;

export function World(props: JSX.IntrinsicElements["mesh"]) {
  const ref = useRef<Mesh<BufferGeometry, ShaderMaterial>>();
  const [renderEnv, setRenderEnv] = useState<boolean>(true);
  const colorScheme = useStore(s => s.colors.colorScheme);

  const palette = useMemo(() => {
    if (colorScheme === "dark") {
      return colorsDark[Math.floor(Math.random() * colorsDark.length)];
    } else {
      return colorsLight[Math.floor(Math.random() * colorsLight.length)];
    }
  }, [colorScheme]);

  const colors = useMemo(() => palette.map(c => new Color(c)), [palette]);

  useFrame(() => {
    if (ref.current) {
      ref.current.material.uniforms.uColor1.value.lerp(colors[0], 0.2);
      ref.current.material.uniforms.uColor2.value.lerp(colors[1], 0.2);
      ref.current.material.uniforms.uColor3.value.lerp(colors[2], 0.2);
      ref.current.material.uniforms.uColor4.value.lerp(colors[3], 0.2);
      ref.current.material.uniforms.uColor5.value.lerp(colors[4], 0.2);

      if (
        colorsEqual(ref.current.material.uniforms.uColor1.value, colors[0]) &&
        colorsEqual(ref.current.material.uniforms.uColor2.value, colors[1]) &&
        colorsEqual(ref.current.material.uniforms.uColor3.value, colors[2]) &&
        colorsEqual(ref.current.material.uniforms.uColor4.value, colors[3]) &&
        colorsEqual(ref.current.material.uniforms.uColor5.value, colors[4])
      ) {
        if (renderEnv) {
          setRenderEnv(false);
        }
      } else if (!renderEnv) {
        setRenderEnv(true);
      }
    }
  });

  return (
    <>
      <Environment frames={renderEnv ? Infinity : 1} background blur={1}>
        <mesh
          ref={ref}
          scale={10}
          // onClick={() => console.log(palette, ref.current)}
          rotation-z={-0.5}
          {...props}
        >
          <sphereGeometry args={[1, 32, 32]} />

          {/* @ts-ignore */}
          <WorldMaterial />
        </mesh>
      </Environment>
    </>
  );
}

function colorsEqual(a: Color, b: Color) {
  let epsilon = 0.0001;
  return (
    Math.abs(a.r - b.r) < epsilon && Math.abs(a.g - b.g) < epsilon && Math.abs(a.b - b.b) < epsilon
  );
}
