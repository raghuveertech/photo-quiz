import React from "react";
import "src/scss/footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      {" "}
      <p className="footer__text">
        For enhancement suggestions or reporting bugs, kindly get in touch with:{" "}
        <a
          href="https://www.linkedin.com/in/raghuveer999/"
          title="Raghuveer Panchagnula"
          target="_blank"
          rel="noreferrer"
        >
          Raghuveer Panchagnula
        </a>
      </p>
    </footer>
  );
};

export default Footer;
