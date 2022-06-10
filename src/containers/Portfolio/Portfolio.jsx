import React from "react";
import { images } from "../../constants";
import "./Portfolio.css";

const Portfolio = () => {
  return (
    <div className="portfolio-section" id="Portfolio">
      <header className="portfolio-header">
        <h2>PORTFOLIO</h2>
      </header>

      <div className="showcase">
        <div className="showcase-head">
        </div>

        <div className="showcase-items">
          <img src={images.portal} alt="showcase item" />
          <img src={images.eatsome} alt="showcase item" />
          <img src={images.car} alt="showcase item" />
        </div>

        <div className="showcase-items2">
        <img src={images.neon} alt="showcase item" />
        <img src={images.car} alt="showcase item" />
        <img src={images.portal} alt="showcase item" />
        </div>

        <p className="showcase-text">And many more to come!</p>
      </div>
    </div>
  );
};

export default Portfolio;
