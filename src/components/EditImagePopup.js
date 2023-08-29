import React, { useState, useCallback, useContext } from "react";
import Cropper from "react-easy-crop";
import "src/scss/edit-image-popup.scss";
import Button from "src/components/UI/Button";
import Modal from "src/components/UI/Modal";
import getCroppedImg from "src/utilities/crop-image";
import { ImagesContext } from "src/App";

const EditImagePopup = (props) => {
  const { images, setImages } = useContext(ImagesContext);

  const { setImageToEdit, image } = props;
  const { id, src } = image;

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const replaceImgWithCroppedImg = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(src, croppedAreaPixels);
      let imagesTemp = [...images];
      imagesTemp = imagesTemp.map((imageItem) => {
        if (imageItem.id === id) {
          return {
            id,
            src: croppedImage,
          };
        } else {
          return imageItem;
        }
      });
      setImages(imagesTemp);
      setImageToEdit({
        id: "",
        sec: "",
      });
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels]);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  return (
    <Modal className="edit-image-popup">
      <div className="edit-image">
        <p className="hint">
          <span className="desktop-hint">SCROLL ON THE IMAGE TO ZOOM</span>
          <span className="mobile-hint">PINCH TO ZOOM</span>
        </p>
        <Cropper
          image={src}
          crop={crop}
          zoom={zoom}
          aspect={16 / 9}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
      <div className="modal-buttons row">
        <div className="col-6">
          <Button
            className="btn secondary-btn"
            onClick={() => {
              setImageToEdit({
                id: "",
                sec: "",
              });
            }}
          >
            <span>Use Original Image</span>
          </Button>
        </div>
        <div className="col-6">
          <Button
            className="btn primary-btn"
            onClick={replaceImgWithCroppedImg}
          >
            <span>Use Cropped Image</span>
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default EditImagePopup;
