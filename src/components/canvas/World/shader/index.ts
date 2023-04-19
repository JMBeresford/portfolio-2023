import vertexShader from "./vert.glsl";
import fragmentShader from "./frag.glsl";
import { shaderMaterial } from "@react-three/drei";
import { BackSide, Color, ShaderMaterial, Texture } from "three";
import { animated } from "@react-spring/three";
import { MaterialNode, extend } from "@react-three/fiber";

type Uniforms = {
  uColor1: Color;
  uColor2: Color;
  uColor3: Color;
  uColor4: Color;
  uColor5: Color;
  uTime: number;
};

const uniforms: Uniforms = {
  uColor1: new Color(0, 0, 0),
  uColor2: new Color(0, 0, 0),
  uColor3: new Color(0, 0, 0),
  uColor4: new Color(0, 0, 0),
  uColor5: new Color(0, 0, 0),
  uTime: 0,
};

export type WorldMaterialProps = ShaderMaterial & Uniforms;

const BaseWorldMaterial = shaderMaterial(uniforms, vertexShader, fragmentShader, m => {
  m.transparent = true;
  m.toneMapped = true;
  m.side = BackSide;
  m.depthWrite = false;
});

extend({ BaseWorldMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    baseWorldMaterial: MaterialNode<WorldMaterialProps, typeof BaseWorldMaterial>;
  }
}

export const WorldMaterial = animated("baseWorldMaterial");
