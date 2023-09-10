import React, { useContext, useEffect, useState } from "react";
import { SettingsContext } from "src/App";

const StageGridItem = (props) => {
  const { noOfChangesRemaining, setNoOfChancesRemaining } =
    useContext(SettingsContext);
  const { difficultyLevel, number, currentImageIndex, revealAll, setPoints } =
    props;
  const [reveal, setReveal] = useState(false);

  useEffect(() => {
    setReveal(false);
  }, [currentImageIndex]);

  useEffect(() => {
    setReveal(revealAll);
  }, [revealAll]);

  const revealHandler = () => {
    if (noOfChangesRemaining === null) {
      setReveal(true);
      setPoints((prevPoints) => {
        return prevPoints - 10;
      });
    } else if (noOfChangesRemaining > 0) {
      setReveal(true);
      setPoints((prevPoints) => {
        return prevPoints - 10;
      });
      setNoOfChancesRemaining((prevNoOfChangesRemaining) => {
        return prevNoOfChangesRemaining - 1;
      });
    }
  };

  return (
    <div
      className={`grid-item ${
        difficultyLevel === 1
          ? "easy"
          : difficultyLevel === 2
          ? "medium"
          : "hard"
      } ${reveal ? "reveal" : ""} `}
      onClick={revealHandler}
    >
      {number}
    </div>
  );
};

export default StageGridItem;
