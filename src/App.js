import { useState, createContext, useEffect } from "react";
import Header from "src/components/layout/Header";
import Footer from "src/components/layout/Footer";
import Screen1 from "src/components/Screen1";
import Screen2 from "src/components/Screen2";
import "src/scss/app.scss";

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
  const [images, setImages] = useState([]); // Array of uploaded images in blob url format.
  const [screen, setScreen] = useState(1); // Screen 1 is for uploading and cropping images. Screen 2 is for the game.
  const [imageToEdit, setImageToEdit] = useState({
    id: "",
    src: "",
  }); // image object that should be edited in the popup

  const [noOfChanges, setNoOfChances] = useState(4); // No. of chances to guess the image
  const [noOfChangesRemaining, setNoOfChancesRemaining] = useState(4);
  const [difficultyLevel, setDifficultyLevel] = useState(2); // based on this value, no. of pieces that cover the image gets decided. More the difficulty level, more no. of pieces.

  useEffect(() => {
    setNoOfChancesRemaining(noOfChanges);
  }, [screen]);

  return (
    <>
      <Header setScreen={setScreen} screen={screen} />{" "}
      {/* There is literally nothing in the header. Just added for beauty :) */}
      <SettingsContext.Provider
        value={{
          noOfChanges,
          setNoOfChances,
          noOfChangesRemaining,
          setNoOfChancesRemaining,
          difficultyLevel,
          setDifficultyLevel,
        }}
      >
        <ImagesContext.Provider
          value={{
            images,
            setImages,
            imageToEdit,
            setImageToEdit,
          }}
        >
          {screen === 1 ? (
            <Screen1 setScreen={setScreen} screen={screen} />
          ) : (
            <>
              <Screen2 />
            </>
          )}
        </ImagesContext.Provider>
      </SettingsContext.Provider>
      {screen === 1 ? <Footer /> : null}
    </>
  );
};

export default App;
