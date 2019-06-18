import React from "react";
import ContentLoader from "react-content-loader";

const ActionsLoader = () => (
  <ContentLoader
    height={203}
    width={200}
    speed={1}
    primaryColor="#242b34"
    secondaryColor="#343d4c"
    style={{ marginLeft: "3.1rem" }}
  >
    <rect x="0" y="0" rx="4" ry="4" width="200" height="203" />
  </ContentLoader>
);

export default ActionsLoader;
