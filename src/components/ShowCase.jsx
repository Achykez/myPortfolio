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
import { BsInstagram, BsFacebook, BsTwitter, BsYoutube } from "react-icons/bs";
import {
  ShowCaseParticleContainer,
  // ShowImageCard,
  Particle,
} from "../styles/Showcase.styled";
import codeBlue from "../assets/codeblue.JPG";
import Achykez from "../assets/ACHYKEZ.png";
import BackParticle from "../assets/particle.png";
import { Clock } from "../utils/Clock";
import { motion } from "framer-motion";
import { fadeInLeftVariant, fadeInRightVariant } from "../utils/Variants";

const ShowCase = () => {
  // const [imageSource, setImageSource] = useState(codeBlue);

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
      top="6%"
      bottom="10%">
      <FlexContainer align="center" fullWidthChild>
        {/* ----Left-content---- */}
        <motion.div
          variants={fadeInLeftVariant}
          initial="hidden"
          whileInView="visible">
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
            with{" "}
            {genesys.years > 0 ? (
              <>
                <StyledSpan>
                  {genesys.years.toString().padStart(2, "0")}
                </StyledSpan>
                {" years and "}
              </>
            ) : null}
            <StyledSpan>
              {genesys.months.toString().padStart(2, "0")}
            </StyledSpan>
            {
              " months of experience in creating user friendly websites and web applications. My experience has grown since "
            }
            <StyledSpan>
              <Clock />
            </StyledSpan>
          </ParaText>

          {/* ----social-icons----  */}
          <FlexContainer gap="20px" responsiveFlex>
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
        </motion.div>

        {/* ---right-content---- */}

        <FlexContainer
  justify="flex-end"
  as={motion.div}
  variants={fadeInRightVariant}
  initial="hidden"
  whileInView="visible"
>
<ShowCaseParticleContainer>
      <ImageWrapper animate={rotateAnimation}>
        <Image src={Achykez} alt="image" />
      </ImageWrapper>
    </ShowCaseParticleContainer>
</FlexContainer>

      </FlexContainer>
    </PaddingContainer>
  );
};

const StyledSpan = styled.span`
  display: inline-block;
  padding: 0.1rem 0.5rem;
  border: 1px solid black;
  border-radius: 8px;
  background-color: ${({theme}) => theme.colors.text1};
  color: ${({theme}) => theme.colors.secondary};
  font-weight: bold;
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
