import vertexShader from "./vert.glsl";
import fragmentShader from "./frag.glsl";
import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import { animated } from "@react-spring/three";
import { ElementType } from "react";
import { Vector2 } from "three";

const MAX_SPHERES = 8;

const BaseMetaBallsMaterial = shaderMaterial(
  {
    uResolution: new Vector2(),
    uTime: 0,
    envMap: undefined,
    envMapIntensity: 1,
    uMix: 0.35,
    uSeeds: undefined,
    uEndOffsets: undefined,
    uFov: 3,
    uSpeeds: undefined,
    uRadii: undefined,
    uCount: 10,
    uAO: 5,
  },
  vertexShader,
  fragmentShader,
  m => {
    m.transparent = true;
    m.defines = { MAX_SPHERES };
    m.toneMapped = true;
  },
);

extend({ BaseMetaBallsMaterial });

const MetaBallsMaterial = animated("baseMetaBallsMaterial" as ElementType);

export { MetaBallsMaterial, MAX_SPHERES };
