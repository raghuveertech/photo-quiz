import React from "react";
import "src/scss/header.scss";
import Button from "src/components/ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Header = (props) => {
  const { screen, setScreen } = props;
  return (
    <header>
      <div className="header-main">
        {screen === 2 ? (
          <div className="back-to-screen-1">
            <Button className="btn link-btn" onClick={() => setScreen(1)}>
              <FontAwesomeIcon icon={faArrowLeft} fade /> Back to Screen 1
            </Button>
          </div>
        ) : null}
      </div>
    </header>
  );
};

export default Header;
