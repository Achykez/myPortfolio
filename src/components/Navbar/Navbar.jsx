import React, { useState } from "react";
import "./Navbar.css";
import { images } from "../../constants";

const Navbar = () => {
  const [fix, setFix] = useState(false);

  const handleScroll = () => {
    if (window.scrollY >= 100) {
      setFix(true);
    } else {
      setFix(false);
    }
  };

  window.addEventListener("scroll", handleScroll);

  return (
    <nav className={fix ? "hero-navbar fixed" : "hero-navbar"}>
    
      <div className="logo">
        <img src={images.pclogo} alt="logo" />
      </div>

      <ul className="hero-links">
        <li>
          <a href="#About">About Me</a>
        </li>
        <li>
          <a href="#Skills">Skills</a>
        </li>
        <li>
          <a href="#Portfolio">Portfolio</a>
        </li>
        <li>
          <a href="#Contact">Contact Me</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
