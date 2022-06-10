import React from "react";
import "./Skills.css";
import { FaHtml5, FaReact } from "react-icons/fa";
import { SiCss3, SiJavascript, SiTypescript } from "react-icons/si";
import { ImGit } from "react-icons/im";
import { GrNode, GrMysql } from "react-icons/gr";
import { DiMongodb } from "react-icons/di";

const Skills = () => {
  return (
    <div className="skills-section" id="Skills">
      <header className="skills-header">
        <h2>SKILLS</h2>
      </header>

      <div className="uses">
        <h2>USING NOW:</h2>
      </div>

      <div className="skills-container">
        <div className="html">
          <FaHtml5 className="html-icon" />
          <p>HTML5</p>
        </div>

        <div className="css">
          <SiCss3 className="css-icon" />
          <p>CSS3</p>
        </div>

        <div className="javascript">
          <SiJavascript className="javascript-icon" />
          <p>JAVASCRIPT</p>
        </div>

        <div className="react">
          <FaReact className="react-icon" />
          <p>REACT</p>
        </div>

        <div className="git">
          <ImGit className="git-icon" />
          <p>GIT</p>
        </div>
      </div>

      <div className="uses">
        <h2>LEARNING:</h2>
      </div>

      <div className="skills-container">
        <div className="node">
          <GrNode className="node-icon" />
          <p>NODEJS</p>
        </div>

        <div className="mysql">
          <GrMysql className="mysql-icon" />
          <p>MySQL</p>
        </div>

        <div className="mongodb">
          <DiMongodb className="mongodb-icon" />
          <p>MONGODB</p>
        </div>

        <div className="typescript">
          <SiTypescript className="ts-icon" />
          <p>TYPESCRIPT</p>
        </div>
      </div>
    </div>
  );
};

export default Skills;
