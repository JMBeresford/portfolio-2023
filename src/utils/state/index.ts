import { create } from "zustand";
import { colorsSlice, type ColorsState } from "./colors";
import { worksSlice, type WorksState } from "./works";
import { MutableRefObject, Ref } from "react";
import { BufferGeometry, Material, Mesh } from "three";

export type State = {
  loaded: boolean;
  hovering: boolean;
  muted: boolean;
  sun: MutableRefObject<Mesh<BufferGeometry, Material>>;
} & ColorsState &
  WorksState;

export const useStore = create<State>()((...a) => ({
  loaded: false,
  hovering: false,
  muted: true,
  sun: undefined,

  ...colorsSlice(...a),
  ...worksSlice(...a),
}));
