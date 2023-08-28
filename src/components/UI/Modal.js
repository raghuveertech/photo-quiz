import React from "react";
import "src/scss/modal.scss";

const Modal = (props) => {
  return (
    <div className={`modal ${props.className} `}>
      <div className="modal-main">{props.children}</div>
    </div>
  );
};

export default Modal;
