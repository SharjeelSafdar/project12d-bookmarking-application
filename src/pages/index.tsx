import React, { FC } from "react";
import { StaticImage } from "gatsby-plugin-image";

import Layout from "../components/layout";
import SEO from "../components/seo";
import BookmarksDashboard from "../components/bookmarksDashboard";

const IndexPage: FC = () => {
  return (
    <Layout>
      <SEO title="Home" />
      <BookmarksDashboard />
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <StaticImage
        src="../images/gatsby-astronaut.png"
        width={300}
        quality={95}
        formats={["auto", "webp", "avif"]}
        alt="A Gatsby astronaut"
        style={{ marginBottom: `1.45rem` }}
      />
    </Layout>
  );
};

export default IndexPage;
