import vertexShader from "./vert.glsl";
import fragmentShader from "./frag.glsl";

import { shaderMaterial } from "@react-three/drei";
import { MaterialNode, extend } from "@react-three/fiber";
import { animated } from "@react-spring/three";
import { AdditiveBlending, ShaderMaterial, Vector3 } from "three";

type Uniforms = {
  uConvergeTo: Vector3;
  uTime: number;
};

const uniforms: Uniforms = {
  uConvergeTo: new Vector3(0, 0, 0),
  uTime: 0,
};

export type ParticlesMaterialProps = ShaderMaterial & Uniforms;

const BaseParticlesMaterial = shaderMaterial(uniforms, vertexShader, fragmentShader, m => {
  m.transparent = true;
  m.toneMapped = true;
  m.premultipliedAlpha = true;
  m.blending = AdditiveBlending;
  m.depthTest = false;
});

extend({ BaseParticlesMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    baseParticlesMaterial: MaterialNode<ParticlesMaterialProps, typeof BaseParticlesMaterial>;
  }
}

export const ParticlesMaterial = animated("baseParticlesMaterial");
