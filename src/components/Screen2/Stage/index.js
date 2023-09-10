import React from "react";
import StageImage from "src/components/Screen2/Stage/StageImage";
import StageGrid from "src/components/Screen2/Stage/StageGrid";
import "src/scss/stage.scss";

const Stage = (props) => {
  const { currentImageIndex, revealAll, setPoints } = props;

  return (
    <div className="stage">
      <StageImage currentImageIndex={currentImageIndex} />
      <StageGrid
        currentImageIndex={currentImageIndex}
        revealAll={revealAll}
        setPoints={setPoints}
      />
    </div>
  );
};

export default Stage;
