import React, { useContext } from "react";
import { ImagesContext } from "src/App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
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
        <FontAwesomeIcon icon={faCircleXmark} />
      </span>
      <div
        className="thumbnail-item__main"
        onClick={() => setImageToEdit(image)}
      >
        <img className="main-image" src={image.src} />
        <span className="edit-image">
          <FontAwesomeIcon icon={faPenToSquare} fade />
        </span>
      </div>
    </div>
  );
};

export default ThumbnailItem;
