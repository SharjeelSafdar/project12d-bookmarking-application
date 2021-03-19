import React, { FC } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { ApolloProvider } from "@apollo/client";

import Layout from "../components/layout";
import SEO from "../components/seo";
import BookmarksDashboard from "../components/bookmarksDashboard";
import { customMuiTheme } from "../context/muiTheme";
import { apolloClient } from "../context/apolloClient";
import { AppContextProvider } from "../context/appContext";

const IndexPage: FC = () => {
  return (
    <Layout>
      <SEO title="Home" />
      <ApolloProvider client={apolloClient}>
        <AppContextProvider>
          <ThemeProvider theme={customMuiTheme}>
            <BookmarksDashboard />
          </ThemeProvider>
        </AppContextProvider>
      </ApolloProvider>
    </Layout>
  );
};

export default IndexPage;
