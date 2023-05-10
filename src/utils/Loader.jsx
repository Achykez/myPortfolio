import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { LoaderWrapper } from "../styles/Global.styled";


const LoaderTitle = styled(motion.h1)`
  font-size: 6rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const LoaderSpinner = styled(LoaderTitle)`
  &:after {
    content: "☯";
  }
`;

const LoaderText = styled(motion.h2)`
  font-size: 2rem;
  font-weight: bold;
`;

const Loader = () => {
  const [loadingTexts, setLoadingTexts] = useState([
    "Loading",
    "Loading.",
    "Loading..",
    "Loading...",
  ]);
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    // Change the loading text every 500ms
    const interval = setInterval(() => {
      setTextIndex((prevIndex) =>
        prevIndex === loadingTexts.length - 1 ? 0 : prevIndex + 1
      );
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <LoaderWrapper>
      <LoaderSpinner
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      <LoaderText
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {loadingTexts[textIndex]}
      </LoaderText>
    </LoaderWrapper>
  );
};




export default Loader;
