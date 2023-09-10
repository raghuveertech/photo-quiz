import React, { useContext } from "react";
import { SettingsContext } from "src/App";
import StageGridItem from "src/components/Screen2/Stage/StageGridItem";

const StageGrid = (props) => {
  const { difficultyLevel } = useContext(SettingsContext);
  const { currentImageIndex, revealAll, setPoints } = props;

  const noOfGrids =
    difficultyLevel === 1 ? 25 : difficultyLevel === 2 ? 36 : 64;
  const noOfGridsArray = new Array(noOfGrids);
  noOfGridsArray.fill(1);

  return (
    <div className="numbers-grid">
      {noOfGridsArray.map((item, index) => {
        return (
          <StageGridItem
            key={index + 1}
            number={index + 1}
            difficultyLevel={difficultyLevel}
            currentImageIndex={currentImageIndex}
            revealAll={revealAll}
            setPoints={setPoints}
          />
        );
      })}
    </div>
  );
};

export default StageGrid;
