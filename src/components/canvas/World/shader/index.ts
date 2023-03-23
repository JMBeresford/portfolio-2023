import vertexShader from "./vert.glsl";
import fragmentShader from "./frag.glsl";
import { shaderMaterial } from "@react-three/drei";
import { BackSide, Color } from "three";
import { animated } from "@react-spring/three";
import { extend } from "@react-three/fiber";
import { ElementType } from "react";

const BaseWorldMaterial = shaderMaterial(
  {
    uColor1: new Color(0, 0, 0),
    uColor2: new Color(0, 0, 0),
    uColor3: new Color(0, 0, 0),
    uColor4: new Color(0, 0, 0),
    uColor5: new Color(0, 0, 0),
  },
  vertexShader,
  fragmentShader,
  m => {
    m.transparent = true;
    m.toneMapped = true;
    m.side = BackSide;
    m.depthWrite = false;
  },
);

extend({ BaseWorldMaterial });

export const WorldMaterial = animated("baseWorldMaterial" as ElementType);
