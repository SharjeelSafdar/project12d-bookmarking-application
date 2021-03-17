import React from "react";
import { WrapRootElementBrowserArgs } from "gatsby";
import { ThemeProvider } from "@material-ui/core/styles";

import { customMuiTheme } from "../context/muiTheme";

export const wrapRootElement = ({ element }: WrapRootElementBrowserArgs) => (
  <ThemeProvider theme={customMuiTheme}>{element}</ThemeProvider>
);
