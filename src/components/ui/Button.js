import React from "react";
import "src/scss/button.scss";

const Button = (props) => {
  const { className, children, onClick } = props;
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
