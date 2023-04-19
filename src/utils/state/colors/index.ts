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
      // ["#e46d29", "#ba4c57", "#4e3a3b", "#a59571", "#d0bc87"],
      ["#880606", "#d53d0c", "#ff8207", "#0074b4", "#9380b7"],
      // ["#4dab8c", "#542638", "#8f244d", "#c9306b", "#e86f9e"],
      ["#5b1d99", "#0074b4", "#00b37c", "#fff45f", "#fc9e6d"],
    ],
    colorsLight: [
      ["#ffedbf", "#f7803c", "#f54828"],
      ["#f59982", "#facb97", "#f3dcb2"],
      // ["#562155", "#a9c2c9", "#c5f7f0"],
    ],
  },
});

const toSort = [["#efd9b4", "#d6a692", "#a39081", "#4d6160", "#292522"]];
