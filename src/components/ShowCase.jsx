import React from "react";

import {
  FlexContainer,
  PaddingContainer,
  Heading,
  BlueText,
  IconContainer,
  ParaText,
} from "../styles/Global.styled";
import { genesys } from "../utils/experience";
import { BsInstagram, BsFacebook, BsTwitter, BsYoutube } from "react-icons/bs";
import {
  ShowCaseParticleContainer,
  ShowImageCard,
  Particle,
} from "../styles/Showcase.styled";
import codeBlue from "../assets/codeblue.JPG";
import BackParticle from "../assets/particle.png";
import { Clock } from "../utils/Clock";

const ShowCase = () => {
  return (
    <PaddingContainer id="Home" left="3%" right="10%" top="15%" bottom="10%">
      <FlexContainer align="center" fullWidthChild>
        {/* ----Left-content---- */}
        <div>
          <Heading as="h4" size="h4">
            Hello
          </Heading>
          <Heading as="h1" size="h1" top="0.5rem" bottom="0.5rem">
            My name is <BlueText>Achike Chude</BlueText>
          </Heading>
          <Heading size="h3" as="h3">
            I am a <BlueText>Frontend Developer</BlueText>
          </Heading>

          <ParaText as="p" top="2rem" bottom="4rem">
            Hello There , my name is Achike Chude and I'm a FrontEnd Developer
            with
            {genesys.years > 0 ? `${genesys.years} years and` : null}{" "}
            {genesys.months} months of experience in creating user friendly
            websites and web applications. My experience has grown since{" "}
            <Clock />.
          </ParaText>

          {/* ----social-icons----  */}
          <FlexContainer gap="20px">
            <IconContainer color="white" size="1.5rem">
              <BsInstagram />
            </IconContainer>
            <IconContainer color="white" size="1.5rem">
              <BsTwitter />
            </IconContainer>
            <IconContainer color="white" size="1.5rem">
              <BsFacebook />
            </IconContainer>
            <IconContainer color="white" size="1.5rem">
              <BsYoutube />
            </IconContainer>
          </FlexContainer>
        </div>

        <FlexContainer justify="flex-end">
          <ShowCaseParticleContainer>
            <ShowImageCard>
              <img src={codeBlue} alt="image" />
            </ShowImageCard>
            <Particle
              src={BackParticle}
              alt="back"
              top="-70px"
              left="20px"
              rotate="60deg"
            />
            <Particle
              src={BackParticle}
              alt="back"
              top="70px"
              right="-70px"
              rotate="0deg"
            />
            <Particle
              src={BackParticle}
              alt="back"
              bottom="10px"
              left="-60px"
              rotate="50deg"
            />
          </ShowCaseParticleContainer>
        </FlexContainer>
      </FlexContainer>
    </PaddingContainer>
  );
};

export default ShowCase;
