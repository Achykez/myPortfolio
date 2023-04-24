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
    secondary: "#0e1cb8",
    text1: "#0e1cb8",
    text2: "#fff",
    para_text_color: "#292828",
    tertiary: "#131c31",
    stick: "#131c31",
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
    tertiary: "#131c31",
    stick: "#fff"
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

  // const [isActive, setIsActive] = useState(false);

  // const handleToggle = () => {
  //   setIsActive(!isActive);
  // };

  useEffect(() => {
    const currentTime = new Date().getHours();
    if (currentTime >= 19 || currentTime < 7) {
      setIsDarkMode(true); // switch to dark mode between 7pm and 7am
    } else {
      setIsDarkMode(false); // switch to light mode between 7am and 7pm
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <MainBody>
        <NavBar>
          <Button type="toggle" onClick={toggleTheme}>
            {isDarkMode ? "Light Theme" : "Dark Theme"}
          </Button>
          {/* <ToggleButton onClick={toggleTheme}>
            {isDarkMode ? "Light Theme" : "Dark Theme"}
          </ToggleButton> */}
        </NavBar>
        <Container>
          <ShowCase />
          <MySkills />
        </Container>
      </MainBody>
    </ThemeProvider>
  );
}

const Button = styled.button`
  color: ${({ theme }) => theme.colors.text2};
  height: 50px;
  width: 90px;
  font-family: "Josefin Sans", sans-serif;

  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.text1};
  margin-left: 30px;
  border: 1px solid #fff;
  box-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  margin-top: 10px;
  cursor: pointer;
`;
const NavBar = styled.div`
  z-index: 999;
  display: flex;
  align-items: center;
  gap: 10px;
  position: sticky;
  width: 100%;
  height: 80px;
  background-color: ${({ theme }) => theme.colors.tertiary};
  top: 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.stick};
`;

// const ToggleButton = styled.button`
//   position: relative;
//   display: inline-block;
//   width: 60px;
//   height: 34px;
//   background-color: #bbb;
//   border-radius: 34px;
//   cursor: pointer;

//   &:after {
//     content: "";
//     position: absolute;
//     top: 2px;
//     left: 2px;
//     width: 30px;
//     height: 30px;
//     background-color: #fff;
//     border-radius: 50%;
//     transition: transform 0.2s ease;
//   }

//   &.active:after {
//     transform: translateX(26px);
//   }
// `;

export default App;
