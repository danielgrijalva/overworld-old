import React from "react";
import { Image } from "semantic-ui-react";

export const Screenshot = ({ size, imageId, onClick }) => {
  return (
    <Image
      rounded
      onClick={onClick}
      alt="screenshot"
      className="screenshot"
      src={`https://images.igdb.com/igdb/image/upload/t_screenshot_${size}/${imageId}.jpg`}
    />
  );
};
