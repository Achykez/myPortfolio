import React, { useState } from "react";
import styled from "styled-components";

import {
  FlexContainer,
  PaddingContainer,
  Heading,
  BlueText,
  IconContainer,
  ParaText,
} from "../styles/Global.styled";
import { genesys } from "../utils/experience";
import {
  BsInstagram,
  BsFacebook,
  BsTwitter,
  BsGithub,
  BsTiktok,
} from "react-icons/bs";
import {
  ShowCaseParticleContainer,
} from "../styles/Showcase.styled";
import Achykez from "../assets/ACHYKEZ.png";
import myFace from "../assets/myFace.png";
import { motion } from "framer-motion";
import { fadeInLeftVariant, fadeInRightVariant } from "../utils/Variants";
import { experienceText } from "../utils/experience";
import { Cursor, useTypewriter, Typewriter } from "react-simple-typewriter";

const ShowCase = (props) => {
  // const [imageSource, setImageSource] = useState(codeBlue);
  const hoverEffect = {
    "&:hover": {
      transform: "scale(3.0)"
    }
  };
  
  const rotateAnimation = {
    rotate: [350, 360],
    transition: {
      duration: 8,
      repeat: 2,
      ease: "linear",
    },
  };

  return (
    <PaddingContainer
      resopnsiveLeft="1rem"
      responsviveRight="1rem"
      responsiveTop="8rem"
      id="Home"
      left="3%"
      right="10%"
      top="15%"
      bottom="10%">
      <FlexContainer align="center" fullWidthChild>
        {/* ----Left-content---- */}
        <motion.div
          variants={fadeInLeftVariant}
          initial="hidden"
          whileInView="visible">
          <Heading as="h4" size="h4">
            <Typewriter delaySpeed={100} words={["Greetings"]} />
          </Heading>
          <Heading as="h1" size="h1" top="0.5rem" bottom="0.5rem">
            <Typewriter delaySpeed={100} words={["My name is"]} />{" "}
            <BlueText>
              <Typewriter delaySpeed={100} words={["Achike Chude"]} />
            </BlueText>
          </Heading>
          <Heading size="h3" as="h3">
            I am a <BlueText>Frontend Developer</BlueText>
          </Heading>

          <ParaText as="p" top="2rem" bottom="4rem">
            {experienceText()}
          </ParaText>

          {/* ----social-icons----  */}
          <FlexContainer gap="20px" responsiveFlex>
            <IconContainer color="white" size="1.5rem">
              <StyledIcon href="https://instagram.com/achykez">
                {" "}
                <BsInstagram />
              </StyledIcon>
            </IconContainer>
            <IconContainer color="white" size="1.5rem">
              <StyledIcon href="https://twitter.com/im_chyke">
                {" "}
                <BsTwitter />
              </StyledIcon>{" "}
            </IconContainer>
            <IconContainer color="white" size="1.5rem">
              <StyledIcon href="https://tiktok.com/@iz_chyke">
                {" "}
                <BsTiktok />
              </StyledIcon>{" "}
            </IconContainer>
            <IconContainer style={hoverEffect} color="white" size="1.5rem">
              <StyledIcon href="https://github.com/achykez">
                {" "}
                <BsGithub />
              </StyledIcon>{" "}
            </IconContainer>
            <IconContainer color="white" size="1.5rem">
              <StyledIcon href="https://web.facebook.com/georgeachike.chude/">
                {" "}
                <BsFacebook />
              </StyledIcon>{" "}
            </IconContainer>
          </FlexContainer>
        </motion.div>

        {/* ---right-content---- */}

        <FlexContainer
          justify="flex-end"
          as={motion.div}
          variants={fadeInRightVariant}
          initial="hidden"
          whileInView="visible">
          <ShowCaseParticleContainer>
            <ImageWrapper animate={rotateAnimation}>
              {props.darkMode ? (
                <Image src={Achykez} alt="image" />
              ) : (
                <Image src={myFace} alt="image" />
              )}
            </ImageWrapper>
          </ShowCaseParticleContainer>
        </FlexContainer>
      </FlexContainer>
    </PaddingContainer>
  );
};


const StyledIcon = styled.a`
  text-decoration: none;
  color: ${({theme}) => theme.colors.text1};
`;

// const ShowImageCard = styled.div`
//   border: 1px solid ${({ theme }) => theme.colors.text2};
//   width: max-content;
//   padding-top: 2rem;
//   border-radius: 1rem;
//   position: relative;
//   overflow: hidden;
// `;

const Image = styled.img`
  display: block;
  max-width: 100%;
  max-height: 100%;
  height: auto;
  width: auto;
  margin: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const ImageWrapper = styled(motion.div)`
  height: 100%;
  width: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

export default ShowCase;
