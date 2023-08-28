import { useState, createContext } from "react";
import Header from "src/components/Header";
import ImageUpload from "src/components/ImageUpload";
import ThumbnailsTrack from "src/components/ThumbnailsTrack";
import Footer from "src/components/Footer";
import "src/scss/app.scss";
import Button from "./components/UI/Button";
import EditImagePopup from "./components/EditImagePopup";
import SettingsPopup from "./components/SettingsPopup";

export const ImagesContext = createContext({
  images: [],
  setImages: () => {},
});

export const SettingsContext = createContext({
  noOfChanges: null,
  setNoOfChances: () => {},
  difficultyLevel: null,
  setDifficultyLevel: () => {},
});

const App = () => {
  const [images, setImages] = useState([]); // Array of uploaded images.
  const [screen, setScreen] = useState(1); // Screen 1 is for uploading and cropping images. Screen 2 is for the game.
  const [imageToEdit, setImageToEdit] = useState({
    id: "",
    src: "",
  }); // give the value of the image that should be edited

  const [showSettingsPopup, setShowSettingsPopup] = useState(false);
  const [noOfChanges, setNoOfChances] = useState(4);
  const [difficultyLevel, setDifficultyLevel] = useState(2);

  return (
    <>
      <Header />
      <SettingsContext.Provider
        value={{
          noOfChanges,
          setNoOfChances,
          difficultyLevel,
          setDifficultyLevel,
        }}
      >
        <ImagesContext.Provider
          value={{
            images,
            setImages,
            setImageToEdit,
          }}
        >
          {/* There is literally nothing in the header. Just added for beauty :) */}

          {screen === 1 ? (
            <>
              <div
                className={`screen-1-main ${!images.length ? "center" : ""} `}
              >
                {images.length ? (
                  <div className="screen-1-main__left">
                    <ThumbnailsTrack />
                  </div>
                ) : null}
                <div className="screen-1-main__right">
                  <h1>
                    {images.length
                      ? "Add More Images..."
                      : "Add Your Images Here"}
                  </h1>
                  {!images.length ? (
                    <p>
                      (Rest assured, I value your privacy and security. I want
                      you to enjoy the game without any concerns. That's why I
                      want to clarify:{" "}
                      <strong>THIS APP DOES NOT STORE YOUR IMAGES</strong> in
                      its database. You have the freedom to upload any images
                      you like, worry-free. Your enjoyment and peace of mind are
                      my top priorities!)
                    </p>
                  ) : null}
                  <ImageUpload />
                  {images.length ? (
                    <div className="screen-1-main__right__btns row">
                      <div className="col-6">
                        <Button
                          className="btn secondary-btn"
                          onClick={() => setShowSettingsPopup(true)}
                        >
                          <span>Settings</span>
                        </Button>
                      </div>
                      <div className="col-6">
                        <Button
                          className="btn primary-btn"
                          onClick={() => setScreen(2)}
                        >
                          <span>Start The Game</span>
                        </Button>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
              {imageToEdit.id ? (
                <EditImagePopup
                  image={imageToEdit}
                  setImageToEdit={setImageToEdit}
                />
              ) : null}

              {showSettingsPopup ? (
                <SettingsPopup setShowSettingsPopup={setShowSettingsPopup} />
              ) : null}

              {/* ThumbnailsTrack component has thumbnails of uploaded images & ImageUpload component */}
            </>
          ) : (
            <></>
          )}
        </ImagesContext.Provider>
      </SettingsContext.Provider>
      <Footer />
    </>
  );
};

export default App;
