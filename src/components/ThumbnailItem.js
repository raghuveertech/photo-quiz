import React, { useContext, useState } from "react";
import { ImagesContext } from "src/App";
import "src/scss/thumbnail-item.scss";

const ThumbnailItem = (props) => {
  const { image } = props;
  const { images, setImages, setImageToEdit } = useContext(ImagesContext);

  const removeImageHandler = (imageId) => {
    let existingImages = [...images];
    let newImages = existingImages.filter((imageItem) => {
      if (imageItem.id !== imageId) {
        return imageItem;
      }
    });
    setImages(newImages);
  };
  return (
    <div className="thumbnail-item">
      <span
        className="remove-image"
        onClick={() => removeImageHandler(image.id)}
      >
        <img src="/images/remove-icon.png" />
      </span>
      <div
        className="thumbnail-item__main"
        onClick={() => setImageToEdit(image)}
      >
        <img className="main-image" src={image.src} />
        <span className="edit-image">
          <img src="/images/draw-icon.png" />
        </span>
      </div>
    </div>
  );
};

export default ThumbnailItem;
