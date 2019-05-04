import React from "react";
import ContentLoader from "react-content-loader";
import { Grid } from "semantic-ui-react";

export const TitleLoader = () => (
  <ContentLoader
    height={25}
    width={400}
    speed={1}
    primaryColor="#242b34"
    secondaryColor="#343d4c"
  >
    <rect x="0" y="0" rx="7" ry="7" width="370" height="13" />
  </ContentLoader>
);

export const ImageLoader = () => (
  <ContentLoader
    height={160}
    width={200}
    speed={1}
    primaryColor="#242b34"
    secondaryColor="#343d4c"
  >
    <rect x="0" y="0" rx="4" ry="4" width="200" height="160" />
  </ContentLoader>
);

export const ListLoader = () => (
  <ContentLoader
    height={110}
    width={400}
    speed={1}
    primaryColor="#242b34"
    secondaryColor="#343d4c"
  >
    <rect x="0" y="0" rx="5" ry="5" width="300" height="10" />
    <rect x="20" y="20" rx="5" ry="5" width="270" height="10" />
    <rect x="20" y="40" rx="5" ry="5" width="220" height="10" />
    <rect x="0" y="60" rx="5" ry="5" width="300" height="10" />
    <rect x="20" y="80" rx="5" ry="5" width="250" height="10" />
    <rect x="20" y="100" rx="5" ry="5" width="130" height="10" />
  </ContentLoader>
);
