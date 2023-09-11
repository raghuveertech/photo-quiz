import React, { useContext, useEffect, useState } from "react";
import { ImagesContext, SettingsContext } from "src/App";
import Button from "src/components/ui/Button";
import Stage from "src/components/Screen2/Stage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faWandMagicSparkles,
  faArrowLeft,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import "src/scss/screen-2.scss";

const Screen2 = (props) => {
  const { noOfChanges, noOfChangesRemaining, setNoOfChancesRemaining } =
    useContext(SettingsContext);
  const { images } = useContext(ImagesContext);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [revealAll, setRevealAll] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [points, setPoints] = useState(0);
  const [showPoints, setShowPoints] = useState(false);
  const [disableNextButton, setDisableNextButton] = useState(true);
  const [headingText, setHeadingText] = useState("");
  const [completedImagesCounter, setCompletedImagesCounter] = useState(1);
  const { setScreen } = props;
  const changeImageHandler = () => {
    setNoOfChancesRemaining(noOfChanges);
    setShowLoader(true);
    setDisableNextButton(true);
    setCompletedImagesCounter((prevCompletedImagesCounter) => {
      return prevCompletedImagesCounter + 1;
    });
    setCurrentImageIndex((prevImageIndex) => {
      return prevImageIndex + 1;
    });
  };

  const correctAnswerHandler = () => {
    setShowPoints(true);
    setDisableNextButton(false);
  };
  const wrongAnswerHandler = () => {
    setPoints(0);
    setShowPoints(true);
    setDisableNextButton(false);
  };

  useEffect(() => {
    setShowPoints(false);
    setShowLoader(false);
    setRevealAll(false);
    setPoints(noOfChangesRemaining * 10 + 10);

    {
      noOfChangesRemaining > 0
        ? setHeadingText(
            <>
              <span>{noOfChangesRemaining}</span> chance
              {noOfChangesRemaining > 1 ? "s" : ""} remaining
            </>
          )
        : setHeadingText(<span>Guess the answer</span>);
    }
  }, [currentImageIndex, noOfChangesRemaining]);

  const revealAllHandler = () => {
    setRevealAll(true);
    setHeadingText(<span>Here you go!</span>);
  };

  return (
    <section className="screen-2">
      {images[currentImageIndex] ? (
        <div className="row">
          <div className="screen-2__left col-6">
            <h2>{headingText}</h2>
            <div className="screen-2__main">
              {showLoader === true ? (
                <div className="next-image-loading">
                  <p>Please Wait...</p>
                </div>
              ) : (
                <Stage
                  currentImageIndex={currentImageIndex}
                  revealAll={revealAll}
                  setPoints={setPoints}
                />
              )}
              <div className="screen-2__main__btns row">
                <div className="col-6">
                  <Button
                    className="btn primary-btn"
                    onClick={revealAllHandler}
                  >
                    <span>
                      Reveal{" "}
                      <FontAwesomeIcon icon={faWandMagicSparkles} shake />
                    </span>
                  </Button>
                </div>
                <div className="col-6">
                  <Button
                    className={`btn secondary-btn ${
                      disableNextButton ? "disabled" : ""
                    } `}
                    onClick={changeImageHandler}
                  >
                    {completedImagesCounter === images.length ? (
                      <span>
                        Done <FontAwesomeIcon icon={faCheck} beat />
                      </span>
                    ) : (
                      <span>
                        {completedImagesCounter === images.length - 1
                          ? "Last"
                          : "Next"}{" "}
                        Image{" "}
                        <FontAwesomeIcon
                          icon={faArrowRight}
                          fade={!disableNextButton}
                        />
                      </span>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="screen-2__right col-6">
            {revealAll ? (
              <div className="right-main">
                {showPoints ? (
                  <div className="row">
                    <div className="col-12 points">{points} Points</div>
                  </div>
                ) : (
                  <div className="row">
                    <div className="col-6">
                      <Button
                        className="btn primary-btn"
                        onClick={correctAnswerHandler}
                      >
                        <span>Correct Answer</span>
                      </Button>
                    </div>
                    <div className="col-6">
                      <Button
                        className="btn secondary-btn"
                        onClick={wrongAnswerHandler}
                      >
                        <span>Wrong Answer</span>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        <>
          <div className="back-to-screen1">
            <h2>
              <span>Well done!</span>
            </h2>
            <Button className="btn secondary-btn" onClick={() => setScreen(1)}>
              <span className="left-icon">
                <FontAwesomeIcon icon={faArrowLeft} fade /> Back to Screen 1
              </span>
            </Button>
          </div>
        </>
      )}
    </section>
  );
};

export default Screen2;
