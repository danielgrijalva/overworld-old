import React from "react";
import ContentLoader from "react-content-loader";

const TitleLoader = () => (
  <ContentLoader
    height={25}
    width={400}
    speed={1}
    primaryColor="#242b34"
    secondaryColor="#343d4c"
  >
    <rect x="0" y="3" rx="7" ry="7" width="245" height="12" />
  </ContentLoader>
);

export default TitleLoader;
