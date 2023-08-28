import React from "react";
import "src/scss/footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__top">
        For enhancement suggestions or reporting bugs, kindly get in touch with:{" "}
        <a
          href="https://www.linkedin.com/in/raghuveer999/"
          title="Raghuveer Panchagnula"
          target="_blank"
          rel="noreferrer"
        >
          Raghuveer Panchagnula
        </a>
      </div>
      <div className="footer__bottom">
        <a
          href="https://www.flaticon.com/free-icons/photo"
          title="photo icons"
          target="_blank"
          rel="noreferrer"
        >
          Icons Source - Flaticon.com
        </a>
      </div>
    </footer>
  );
};

export default Footer;
