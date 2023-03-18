import React, { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { MainBody, Container } from "./styles/Global.styled";

// components
import ShowCase from "./components/ShowCase";
import MySkills from "./components/MySkills";

export const lightTheme = {
  colors: {
    primary: "#f2f5fc",
    primary_light: "#131c31",
    secondary: "#0eb871",
    text1: "#000",
    text2: "#fff",
    para_text_color: "#292828",
  },
  fonts: {
    family: "DM sans",
    weight: {
      regular: 400,
      medium: 500,
      bold: 700,
    },
  },
  breakpoints: {
    mobile: "720px",
  },
};

export const darkTheme = {
  colors: {
    primary: "#131c31",
    primary_light: "#0f172a",
    secondary: "#7eadfc",
    text1: "#fff",
    text2: "#000",
    para_text_color: "#dcdcdc",
  },
  fonts: {
    family: "DM sans",
    weight: {
      regular: 400,
      medium: 500,
      bold: 700,
    },
  },
  breakpoints: {
    mobile: "720px",
  },
};



function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const currentTime = new Date().getHours();
    if (currentTime >= 19 || currentTime < 7) {
      setIsDarkMode(true); // switch to dark mode between 7pm and 7am
    } else {
      setIsDarkMode(false); // switch to light mode between 7am and 7pm
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <MainBody>
          <Button type="toggle" onClick={toggleTheme}>{isDarkMode ? "Light Theme" : "Dark Theme"}</Button>
        <Container>
          <ShowCase />
          <MySkills />
        </Container>
      </MainBody>
    </ThemeProvider>
  );
}

 const Button = styled.button`
  color: ${({theme}) => theme.colors.text1};
  height: 50px;
  width: 80px;
  border-radius: 10px;
  background-color: ${({theme}) => theme.colors.text2};
  margin-left: 30px;
  position: right;
  border: none;
  margin-top: 10px;
  cursor: pointer;
`

export default App;
