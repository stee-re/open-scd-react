import type { PaletteOptions } from "@mui/material/styles";

export const darkPalette: PaletteOptions = {
  mode: "dark",

  primary: {
    main: "#268bd2",
    contrastText: "#fdf6e3",
  },
  secondary: {
    main: "#2aa198",
    contrastText: "#fdf6e3",
  },
  background: {
    default: "#002b36",
    paper: "#073642",
  },
  text: {
    primary: "#839496",
    secondary: "#93a1a1",
  },
  success: {
    main: "#67be23",
    contrastText: "#fff",
  },
  error: {
    main: "#ee2a1e",
    contrastText: "#fff",
  },
  warning: {
    main: "#fa8c16",
    contrastText: "#fff",
  },
  info: {
    main: "#1890ff",
    contrastText: "#fff",
  },
  divider: "rgba(0,0,0,0)",
};
