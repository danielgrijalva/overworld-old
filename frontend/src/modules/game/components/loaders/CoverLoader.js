import React from "react";
import ContentLoader from "react-content-loader";

const CoverLoader = () => (
  <ContentLoader
    height={400}
    width={200}
    speed={1}
    primaryColor="#242b34"
    secondaryColor="#343d4c"
  >
    <rect x="0" y="0" rx="4" ry="4" width="200" height="240" />
  </ContentLoader>
);

export default CoverLoader;
