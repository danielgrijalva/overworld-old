import React from "react";
import ContentLoader from "react-content-loader";

const TileCoverLoader = () => (
  <ContentLoader
    height={100}
    width={100}
    speed={1}
    primaryColor="#242b34"
    secondaryColor="#343d4c"
  >
    <rect x="0" y="0" rx="4" ry="4" width="190" height="265" />
  </ContentLoader>
);

export default TileCoverLoader;
