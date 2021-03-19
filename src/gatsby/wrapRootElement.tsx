import React from "react";
import { WrapRootElementBrowserArgs } from "gatsby";
import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "@material-ui/core";

import { AppContextProvider } from "../context/appContext";
import { apolloClient } from "../context/apolloClient";
import { customMuiTheme } from "../context/muiTheme";

export const wrapRootElement = ({ element }: WrapRootElementBrowserArgs) => (
  <ThemeProvider theme={customMuiTheme}>
    <ApolloProvider client={apolloClient}>
      <AppContextProvider>{element}</AppContextProvider>
    </ApolloProvider>
  </ThemeProvider>
);
