import React, { useContext } from "react";
import { ImagesContext } from "src/App";

const StageImage = (props) => {
  const { images } = useContext(ImagesContext);
  const { currentImageIndex } = props;
  return (
    <div className="image">
      {currentImageIndex === 0 ||
      (currentImageIndex && images[currentImageIndex]) ? (
        <img src={images[currentImageIndex].src} alt="Pic" />
      ) : null}
    </div>
  );
};

export default StageImage;
