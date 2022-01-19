import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  typography: {
    fontFamily: '"Roboto", "Open Sans", "sans-serif" ',
    fontSize: 12,
    button: {
      textTransform: "none",
      fontWeight: 700,
    },
  },
  palette: {
    // primary: { main: "#f04826" }, //pink
    primary: {
      main: "#0a2d26",
      light: "#34564e",
      dark: "#000400",
      contrastText: "#fff",
    }, //green
    secondary: {
      main: "#db9769",
      light: "#ffc898",
      dark: "#a7693d",
      contrastText: "#000",
    }, //tan
  },
  shape: {
    borderRadius: 3,
  },
});
