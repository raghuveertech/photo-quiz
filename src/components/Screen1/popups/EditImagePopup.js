import React, { useState, useCallback, useContext } from "react";
import Cropper from "react-easy-crop";
import Button from "src/components/ui/Button";
import Modal from "src/components/ui/Modal";
import getCroppedImg from "src/utilities/crop-image";
import { ImagesContext } from "src/App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHand, faCropSimple } from "@fortawesome/free-solid-svg-icons";
import "src/scss/edit-image-popup.scss";

const EditImagePopup = () => {
  const { images, setImages, setImageToEdit, imageToEdit } =
    useContext(ImagesContext);

  const { id, src } = imageToEdit;

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
            <span>
              Don't Crop <FontAwesomeIcon icon={faHand} />
            </span>
          </Button>
        </div>
        <div className="col-6">
          <Button
            className="btn primary-btn"
            onClick={replaceImgWithCroppedImg}
          >
            <span>
              Crop <FontAwesomeIcon icon={faCropSimple} />
            </span>
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default EditImagePopup;
