import React from "react";
import ContentLoader from "react-content-loader";

const TextLoader = () => (
  <ContentLoader
    height={150}
    width={400}
    speed={1}
    primaryColor="#242b34"
    secondaryColor="#343d4c"
  >
    <rect x="0" y="5" rx="5" ry="5" width="399" height="10" />
    <rect x="0" y="25" rx="5" ry="5" width="399" height="10" />
    <rect x="0" y="45" rx="5" ry="5" width="399" height="10" />
    <rect x="0" y="65" rx="5" ry="5" width="340" height="10" />
  </ContentLoader>
);

export default TextLoader;
