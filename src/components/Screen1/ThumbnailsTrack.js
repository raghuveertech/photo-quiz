import React, { useContext } from "react";
import ThumbnailItem from "src/components/Screen1/ThumbnailItem";
import { ImagesContext } from "src/App";
import "src/scss/thumbnails-track.scss";

const ThumbnailsTrack = () => {
  const { images } = useContext(ImagesContext);
  return (
    <>
      <div className="thumbnails-track">
        {images.map((image) => {
          return <ThumbnailItem image={image} key={image.id} />;
        })}
      </div>
    </>
  );
};

export default ThumbnailsTrack;
