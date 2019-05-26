import React from "react";
import ContentLoader from "react-content-loader";

export const TitleLoader = () => (
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

export const ImageLoader = () => (
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

export const ActionsLoader = () => (
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

export const TextLoader = () => (
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
