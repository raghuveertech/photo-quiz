import { useContext, useState } from "react";
import ImageUpload from "src/components/Screen1/ImageUpload";
import ThumbnailsTrack from "src/components/Screen1/ThumbnailsTrack";
import Button from "src/components/ui/Button";
import EditImagePopup from "src/components/Screen1/popups/EditImagePopup";
import SettingsPopup from "src/components/Screen1/popups/SettingsPopup";
import { ImagesContext } from "src/App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faPuzzlePiece } from "@fortawesome/free-solid-svg-icons";
import "src/scss/screen-1.scss";

const Screen1 = (props) => {
  const { images, imageToEdit } = useContext(ImagesContext);
  const [showSettingsPopup, setShowSettingsPopup] = useState(false);
  const { setScreen } = props;
  return (
    <>
      <div className={`screen-1 ${!images.length ? "center" : ""} `}>
        {images.length ? (
          <div className="screen-1__left">
            <ThumbnailsTrack />
            {/* ThumbnailsTrack component has thumbnails of uploaded images & ImageUpload component */}
          </div>
        ) : null}
        <div className="screen-1__right">
          <h1>
            {images.length ? "Add More Images..." : "Add Your Images Here"}
          </h1>
          {!images.length ? (
            <p>
              (Rest assured, I value your privacy and security. I want you to
              enjoy the game without any concerns. That's why I want to clarify:{" "}
              <strong>THIS APP DOES NOT STORE YOUR IMAGES</strong> in its
              database. You have the freedom to upload any images you like,
              worry-free. Your enjoyment and peace of mind are my top
              priorities!)
            </p>
          ) : null}
          <ImageUpload />
          {images.length ? (
            <div className="screen-1__right__btns row">
              <div className="col-6">
                <Button
                  className="btn secondary-btn"
                  onClick={() => setShowSettingsPopup(true)}
                >
                  <span>
                    Settings <FontAwesomeIcon icon={faGear} spin />
                  </span>
                </Button>
              </div>
              <div className="col-6">
                <Button
                  className="btn primary-btn"
                  onClick={() => setScreen(2)}
                >
                  <span>
                    Start The Game <FontAwesomeIcon icon={faPuzzlePiece} beat />
                  </span>
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      {imageToEdit.id ? <EditImagePopup /> : null}

      {showSettingsPopup ? (
        <SettingsPopup setShowSettingsPopup={setShowSettingsPopup} />
      ) : null}
    </>
  );
};

export default Screen1;
