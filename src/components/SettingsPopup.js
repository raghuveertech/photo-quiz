import React, { useContext, useState } from "react";
import Modal from "src/components/UI/Modal";
import { SettingsContext } from "src/App";
import "src/scss/settings-popup.scss";
import Button from "./UI/Button";

const SettingsPopup = (props) => {
  const { setShowSettingsPopup } = props;

  const { noOfChanges, setNoOfChances, difficultyLevel, setDifficultyLevel } =
    useContext(SettingsContext);

  const [noLimit, setNoLimit] = useState(false);

  const noLimitHandler = (e) => {
    setNoLimit(e.target.checked);
    setNoOfChances(e.target.checked ? 0 : 1);
  };

  const incrementChancesHandler = () => {
    setNoOfChances((prevValue) => {
      return prevValue + 1;
    });
  };

  const decrementChancesHandler = () => {
    setNoOfChances((prevValue) => {
      return prevValue - 1;
    });
  };

  const incrementDifficultyHandler = () => {
    setDifficultyLevel((prevValue) => {
      return prevValue + 1;
    });
  };

  const decrementDifficultyHandler = () => {
    setDifficultyLevel((prevValue) => {
      return prevValue - 1;
    });
  };

  let difficultyLevelText = "";
  switch (difficultyLevel) {
    case 1:
      difficultyLevelText = "Easy";
      break;
    case 2:
      difficultyLevelText = "Medium";
      break;
    case 3:
      difficultyLevelText = "Hard";
      break;
    default:
      difficultyLevelText = "Medium";
  }

  return (
    <Modal className="settings-popup">
      <h2 className="col-12">Settings</h2>
      <div className="row">
        <div className="field-group col-6">
          <h3>No. of chances:</h3>
          <div className={`range-container ${noLimit ? "disabled" : ""}`}>
            <span
              className={`decrement ${noOfChanges <= 0 ? "disabled" : ""} `}
              onClick={decrementChancesHandler}
            >
              -
            </span>
            <p className="actual-value">{noOfChanges}</p>
            <span
              className={`increment ${noOfChanges >= 10 ? "disabled" : ""} `}
              onClick={incrementChancesHandler}
            >
              +
            </span>
          </div>
          <label
            htmlFor="noLimit"
            className={`label-checkbox ${noLimit ? "checked" : ""} `}
          >
            <span className="pseudo-checkbox">
              <img src="/images/check-mark-icon.png" alt="No Limit" />
            </span>
            <input type={"checkbox"} id="noLimit" onChange={noLimitHandler} />
            No Limit
          </label>
        </div>
        <div className="field-group col-6">
          <h3>Difficulty Level:</h3>
          <div className={`range-container`}>
            <span
              className={`decrement ${difficultyLevel <= 1 ? "disabled" : ""} `}
              onClick={decrementDifficultyHandler}
            >
              -
            </span>
            <p className="actual-value">{difficultyLevelText}</p>
            <span
              className={`increment ${difficultyLevel >= 3 ? "disabled" : ""} `}
              onClick={incrementDifficultyHandler}
            >
              +
            </span>
          </div>
        </div>
      </div>
      <div className="buttons">
        <Button
          className="btn primary-btn"
          onClick={() => setShowSettingsPopup(false)}
        >
          <span>Done</span>
        </Button>
      </div>
    </Modal>
  );
};

export default SettingsPopup;
