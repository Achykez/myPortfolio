import React from "react";

import {
  FlexContainer,
  Heading,
  PaddingContainer,
  IconContainer,
  ParaText,
  BlueText,
} from "../styles/Global.styled";

import { SkillCard, SkillsCardContainer } from "../styles/MySkills.styled";
import { motion } from "framer-motion";
import { Skills } from "../utils/Data";
import { fadeInLeftVariant, fadeInRightVariant } from "../utils/Variants";


const MySkills = () => {
  return (
    <PaddingContainer
      id="Skills"
      top="10%"
      bottom="10%"
      responsiveLeft="1rem"
      responsiveRight="1rem">
      <FlexContainer 
        responsiveFlex
        responsiveDirection="column-reverse" 
        fullWidthChild>
        <SkillsCardContainer
          as={motion.div}
          variants={fadeInLeftVariant}
          initial="hidden"
          whileInView="visible"
        >
          {Skills.map((skill) => (
            <SkillCard   style={{ transform: 'rotate(0 360deg)' }}>
              <IconContainer  size="5rem" color="blue">
                {skill.icon}
              </IconContainer>
              <Heading as="h4" size="h4">
                {skill.tech}
              </Heading>
            </SkillCard>
          ))}
        </SkillsCardContainer>
        {/* --right-section */}
        <motion.div
           variants={fadeInRightVariant}
           initial="hidden"
           whileInView="visible"
        
        >
          <Heading as="h4" size="h4">
            MY SKILLS
          </Heading>
          <Heading as="h2" size="h2" top="0.5rem">
           What I <BlueText> can do ?</BlueText>
          </Heading>

          <ParaText>
          I have a broad range of skills that enable me to tackle various web and app development projects. As a FrontEnd Heavy FullStack developer, I can handle all aspects of the development process, from ideation and design to implementation and deployment. I have a deep understanding of front-end technologies, including HTML, CSS, and JavaScript, as well as popular front-end frameworks such as React and Vue. Additionally, I have experience with back-end technologies like Node.js, Express, and MongoDB, allowing me to develop full-stack applications. I am familiar with various development tools and practices, including Git, Agile methodologies, and test-driven development. Overall, I am a versatile developer with a diverse set of skills and a passion for creating user-friendly and engaging web and app experiences.
          </ParaText>
        </motion.div>
      </FlexContainer>
    </PaddingContainer>
  );
};

export default MySkills;
