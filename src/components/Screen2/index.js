import React, { useContext, useEffect, useState } from "react";
import { SettingsContext } from "src/App";
import Button from "src/components/ui/Button";
import Stage from "src/components/Screen2/Stage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faWandMagicSparkles,
} from "@fortawesome/free-solid-svg-icons";
import "src/scss/screen-2.scss";

const Screen2 = () => {
  const { noOfChanges, noOfChangesRemaining, setNoOfChancesRemaining } =
    useContext(SettingsContext);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [revealAll, setRevealAll] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [points, setPoints] = useState(0);
  const [showPoints, setShowPoints] = useState(false);

  const changeImageHandler = () => {
    setNoOfChancesRemaining(noOfChanges);
    setShowLoader(true);
    setTimeout(() => {
      setCurrentImageIndex((prevImageIndex) => {
        return prevImageIndex + 1;
      });
    }, 300);
  };

  const correctAnswerHandler = () => {
    setShowPoints(true);
  };
  const wrongAnswerHandler = () => {
    setPoints(0);
    setShowPoints(true);
  };

  useEffect(() => {
    setShowPoints(false);
    setShowLoader(false);
    setRevealAll(false);
    setPoints(noOfChangesRemaining * 10 + 10);
  }, [currentImageIndex]);

  return (
    <section className="screen-2">
      <div className="row">
        <div className="screen-2__left col-6">
          {noOfChangesRemaining > 0 ? (
            <h2>
              <span>{noOfChangesRemaining}</span> chance
              {noOfChangesRemaining > 1 ? "s" : ""} remaining
            </h2>
          ) : (
            <h2>
              <span>Guess the answer</span>
            </h2>
          )}
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
                  onClick={() => setRevealAll(true)}
                >
                  <span>
                    Reveal <FontAwesomeIcon icon={faWandMagicSparkles} shake />
                  </span>
                </Button>
              </div>
              <div className="col-6">
                <Button
                  className="btn secondary-btn"
                  onClick={changeImageHandler}
                >
                  <span>
                    Next Image <FontAwesomeIcon icon={faArrowRight} fade />
                  </span>
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
    </section>
  );
};

export default Screen2;
