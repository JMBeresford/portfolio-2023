import { create } from "zustand";
import { colorsSlice, type ColorsState } from "./colors";
import { worksSlice, type WorksState } from "./works";

export type State = ColorsState & WorksState;

export const useStore = create<State>()((...a) => ({
  ...colorsSlice(...a),
  ...worksSlice(...a),
}));
