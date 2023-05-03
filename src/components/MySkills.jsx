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
            <SkillCard>
              <IconContainer size="5rem" color="blue">
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
            I <BlueText> can do</BlueText>
          </Heading>

          <ParaText>
            A whole lot actually, ranging from web designs to app designs,
            FrontEnd Heavy FullStack developer with an array of skill sets ready
            and willing to get the job done.
          </ParaText>
        </motion.div>
      </FlexContainer>
    </PaddingContainer>
  );
};

export default MySkills;
