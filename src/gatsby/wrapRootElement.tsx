import React from "react";
import { WrapRootElementBrowserArgs } from "gatsby";
import { ThemeProvider } from "@material-ui/core/styles";
import { ApolloProvider } from "@apollo/client";

import { customMuiTheme } from "../context/muiTheme";
import { apolloClient } from "../context/apolloClient";
import { AppContextProvider } from "../context/appContext";

export const wrapRootElement = ({ element }: WrapRootElementBrowserArgs) => (
  <ThemeProvider theme={customMuiTheme}>
    <ApolloProvider client={apolloClient}>
      <AppContextProvider>{element}</AppContextProvider>
    </ApolloProvider>
  </ThemeProvider>
);
