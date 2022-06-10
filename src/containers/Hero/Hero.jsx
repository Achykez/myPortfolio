import React, { useState } from "react";
import "./Hero.css";
import { images } from "../../constants";
import { HiMenu, HiX } from "react-icons/hi";
import { SiMaildotru } from "react-icons/si";
import { GrGithub, GrLinkedin } from "react-icons/gr";
import Navbar from "../../components/Navbar/Navbar";

const Hero = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="hero-section" id="hero">
      <Navbar />

      <nav>
        <div className="hero-navbar-menu">
          <img src={images.mobilelogo} alt="mobile-logo" />
          <button className="menu" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>

        <ul
          className={isMenuOpen ? "hero-navbar-links" : "nav"}
          onClick={() => setIsMenuOpen(false)}
        >
          <li>
            <a href="#About">About</a>
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

      <div className="mobile-content">
        <p className="mobile-name">Call me Achykez</p>
        <h1 className="mobile-job">I'M A FRONT-END DEVELOPER</h1>
        <img
          className="white-separator"
          src={images.whiteline}
          alt="separator"
        />

        <div className="mobile-links">
          <a
            href="mailto:chyke.ghoul@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SiMaildotru className="mobile-hero-mail" />
          </a>
          <a
            href="https://github.com/Achykez"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GrGithub className="mobile-hero-github" />
          </a>
          <a href="null" target="_blank" rel="noopener noreferrer">
            <GrLinkedin className="mobile-hero-linkedin" />
          </a>
        </div>
      </div>

      <div className="hero-content">
        <div className="hero-about">
          <p className="introduction">Hi, I am</p>
          <h1 className="name">Achike Chude</h1>
          <p className="profession">Front-End Developer</p>
        </div>
        <div className="hero-image">
          <img src={images.hero} alt="profile pic" />
        </div>
      </div>

      <div className="hero-social-links">
        <a
          href="mailto:chyke.ghoul@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <SiMaildotru className="hero-mail" />
        </a>
        <a
          href="https://github.com/Achykez"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GrGithub className="hero-github" />
        </a>
        <a href="null" target="_blank" rel="noopener noreferrer">
          <GrLinkedin className="hero-linkedin" />
        </a>
      </div>
    </div>
  );
};

export default Hero;
