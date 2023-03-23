import { StateCreator } from "zustand";
import type { State } from "..";

type ColorScheme = "dark" | "light";
type Color = string;
type Palette = Color[];

export type ColorsState = {
  colors: {
    colorScheme: ColorScheme;
    changeColorScheme: () => void;
    colorsDark: Palette[];
    colorsLight: Palette[];
  };
};

export const colorsSlice: StateCreator<State, [], [], ColorsState> = set => ({
  colors: {
    colorScheme: "dark" as ColorScheme,
    changeColorScheme: () => {
      set(state => ({
        colors: {
          ...state.colors,
          colorScheme: state.colors.colorScheme === "dark" ? "light" : "dark",
        },
      }));
    },
    colorsDark: [
      ["#9e1e4c", "#ff1168", "#25020f", "#8f8f8f", "#ececec"],
      ["#130912", "#3e1c33", "#602749", "#b14623", "#f6921d"],
      ["#368986", "#e79a32", "#f84339", "#d40f60", "#005c81"],
      ["#85847e", "#ab6a6e", "#f7345b", "#353130", "#cbcfb4"],
      ["#27191c", "#2d3839", "#114d4d", "#6e9987", "#e0e4ce"],
      ["#ff3366", "#c74066", "#8f4d65", "#575a65", "#1f6764"],
    ],
    colorsLight: [
      ["#ffedbf", "#f7803c", "#f54828", "#2e0d23", "#f8e4c1"],
      ["#f3dcb2", "#facb97", "#f59982", "#ed616f", "#f2116c"],
      ["#c5f7f0", "#a9c2c9", "#8e8ca3", "#72577c", "#562155"],
    ],
  },
});

const toSort = [["#efd9b4", "#d6a692", "#a39081", "#4d6160", "#292522"]];
