import React from "react";
import { TabContainer } from "./components/TabContainer";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { theme } from "./DefaultTheme";

export const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <TabContainer />
  </ThemeProvider>
);
