import React from "react";

import {
  FlexContainer,
  Heading,
  PaddingContainer,
  IconContainer,
  ParaText,
  BlueText,
} from "../styles/Global.styled";

import {
    SkillsCardContainer
} from "../styles/MySkills.styled"

const MySkills = () => {
  return (
  <PaddingContainer
    id="Skills"
    top="10%"
    bottom="10%"
  >
    <FlexContainer fullWidthChild>
        <SkillsCardContainer>

        </SkillsCardContainer>

    </FlexContainer>
  </PaddingContainer>

  
  );
};

export default MySkills;
