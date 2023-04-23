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
      ["#880606", "#d53d0c", "#ff8207", "#0074b4", "#9380b7"],
      ["#620e5d", "#0074b4", "#9d007a", "#ce3762", "#2f1335"],
      ["#5b1d99", "#0074b4", "#00b37c", "#fff45f", "#fc9e6d"],
      ["#865a19", "#c4b282", "#85005b", "#520647", "#0e002f"],
      ["#670d0f", "#f01945", "#f36444", "#ffce6f", "#ffe3c9"],
    ],
    colorsLight: [
      ["#ffedbf", "#f7803c", "#f54828"],
      ["#f59982", "#facb97", "#f3dcb2"],
      // ["#562155", "#a9c2c9", "#c5f7f0"],
    ],
  },
});

const toSort = [["#efd9b4", "#d6a692", "#a39081", "#4d6160", "#292522"]];
