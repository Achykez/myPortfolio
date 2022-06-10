import React from "react";
import "./Footer.css";
import { BiChevronsUp } from "react-icons/bi";

const Footer = () => {
  return (
    <div className="footer-section">
      <div className="top-nav">
        <a href="#hero">
          <BiChevronsUp />
        </a>
        <a href="#hero">BACK TO TOP</a>
      </div>

      <div className="copyrights">
        <p>&#64;2018 Chude Achike</p>
        {/* <p className="rights">All Rights Reserved.</p> */}
      </div>
    </div>
  );
};

export default Footer;
