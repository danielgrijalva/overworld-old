import React from "react";
import ContentLoader from "react-content-loader";

const CoverLoader = props => {
  const { rows, columns, coverHeight, coverWidth, padding } = props;
  const coverHeightWithPadding = coverHeight + padding;
  const coverWidthWithPadding = coverWidth + padding;
  const covers = Array(columns * rows).fill(1);
  return (
    <ContentLoader
      speed={1}
      width={columns * coverWidthWithPadding}
      height={rows * coverHeightWithPadding}
      primaryColor="#242b34"
      secondaryColor="#343d4c"
    >
      {covers.map((g, i) => {
        let vy = Math.floor(i / columns) * coverHeightWithPadding;
        let vx =
          (i * coverWidthWithPadding) % (columns * coverWidthWithPadding);
        return (
          <rect
            x={vx}
            y={vy}
            rx="0"
            ry="0"
            width={coverWidth}
            height={coverHeight}
          />
        );
      })}
    </ContentLoader>
  );
};

export default CoverLoader;
