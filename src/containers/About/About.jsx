import React from "react";
import Skills from "../Skills/Skills";
import "./About.css";
import { images } from "../../constants";

const About = () => {
  return (
    <div className="about-section" id="About">
      <header className="about-header">
        <h2>ABOUT ME</h2>
      </header>

      <div className="about-content">
        <div className="about-intro">
          <p className="about-intro-text">
            I am Achike Chude , Front-End Developer by day, and still Front-End by night cos it's still day somewhere on the other side of
             this little blue planet
            <br />Using  a couple lines of Code to bring web pages to life 
            comes with a nice thrill and with every new project i know there's more to discover <br />
            experience building projects with various libraries and tools such
            as
            <br /> HTML, CSS, JavaScript, React, Styled-Components.
          </p>

          <p className="explore">SERVICES</p>

          <img className="blackline" src={images.blackline} alt="separator" />
        </div>
      </div>

      <div className="services-container">
        <div className="about-services">
          <div className="dev-services">
            <div className="dev-services-title">
              <img
                src={images.development}
                alt="dev-logo"
                className="dev-logo"
              />
              <h3>DEVELOPMENT</h3>
            </div>
            <div className="dev-text">
              <p>
                I can build User Friendly Websites that suit your requirements
                <br />
                Give proper Advice for a good and efficient website
              </p>
            </div>
          </div>

          <div className="maint-services">
            <div className="maint-services-title">
              <img
                src={images.maintenance}
                alt="maint-logo"
                className="maint-logo"
              />
              <h3>MAINTENANCE</h3>
            </div>

            <div className="maint-text">
              <p>
                You can leave the maintenace of your site to me. I can make
                <br /> sure the site has what it needs to be kept running and
                functional.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="separator">
        <img
          className="blackline"
          src={images.blackline}
          alt="black-separator"
        />
      </div>
      <Skills />
    </div>
  );
};

export default About;
