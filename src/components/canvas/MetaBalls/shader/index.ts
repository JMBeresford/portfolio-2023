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
    uSurfaceThreshold: 0.01,
    uLowRes: undefined,
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

const BaseIntersectionMetaBallsMaterial = shaderMaterial(
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
    m.defines = { MAX_SPHERES, INTERSECTION_ONLY: 1 };
    m.toneMapped = true;
  },
);

extend({ BaseMetaBallsMaterial, BaseIntersectionMetaBallsMaterial });

const MetaBallsMaterial = animated("baseMetaBallsMaterial" as ElementType);
const IntersectionMetaBallsMaterial = animated("baseIntersectionMetaBallsMaterial" as ElementType);

export {
  MetaBallsMaterial,
  IntersectionMetaBallsMaterial,
  BaseIntersectionMetaBallsMaterial,
  MAX_SPHERES,
};
