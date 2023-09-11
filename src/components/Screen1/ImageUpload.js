import React, { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { ImagesContext } from "src/App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpFromBracket,
  faImages,
} from "@fortawesome/free-solid-svg-icons";
import "src/scss/image-upload.scss";

const ImageUpload = () => {
  const { setImages } = useContext(ImagesContext);
  const handleFileChange = (e) => {
    const files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      let currentImage = URL.createObjectURL(files[i]);
      let currentImageObject = {
        id: uuidv4(),
        src: currentImage,
      };
      setImages((prevImages) => {
        return [...prevImages, currentImageObject];
      });
    }
  };
  return (
    <div className="image-upload-wrap">
      <label htmlFor="uploadImage">
        <span className="icon">
          <FontAwesomeIcon icon={faImages} bounce />
        </span>
        <span className="text">
          <FontAwesomeIcon icon={faArrowUpFromBracket} /> Browse images{" "}
          <span className="drag-drop">or drag and drop</span>
        </span>
      </label>
      <input
        id="uploadImage"
        type={"file"}
        accept="image/*"
        onChange={handleFileChange}
        multiple
      />
    </div>
  );
};

export default ImageUpload;
