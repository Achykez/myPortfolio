import React, { useState, useEffect, useRef } from "react";
import styled, { ThemeProvider } from "styled-components";
import ShowCase from "./components/ShowCase";
import MySkills from "./components/MySkills";
import { MyProjects } from "./components/MyProjects";
import Loader from "./utils/Loader";
import Footer from "./components/Footer";
import ReactSwitch from 'react-switch';

export const lightTheme = {
  colors: {
    primary: "#f2f5fc",
    primary_light: "#131c31",
    secondary: "#1325e1",
    button_hover: "#588ce4",
    text1: "#0e1cb8",
    text2: "#fff",
    para_text_color: "#292828",
    tertiary: "#131c31",
    stick: "#131c31",
    paranormal: "#e9e1e1",
    button_normal: "#e9e1e1",
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
    button_hover: "#7eadfc",
    text1: "#fff",
    text2: "#000",
    para_text_color: "#dcdcdc",
    tertiary: "#131c31",
    stick: "#fff",
    paranormal: "#fff",
    button_normal: "#fff",
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

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a delay to show the loader
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const savedMode = localStorage.getItem("isDarkMode");
    const currentTime = new Date().getHours();
    if (savedMode !== null) {
      setIsDarkMode(savedMode === "true");
    } else {
      setIsDarkMode(currentTime >= 19 || currentTime < 7);
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("isDarkMode", newMode.toString());
  };
  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      {loading ? (
        <Loader />
      ) : (
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
          <MainBody>
            <NavBar>
              {/* <Button type="toggle" onClick={toggleTheme}>
                {isDarkMode ? "Light Theme" : "Dark Theme"}
              </Button> */}
              
            </NavBar>
            <SwitchContainer>
              <ReactSwitch
                  checked={isDarkMode}
                  onChange={toggleTheme}
                  height={30}
                  width={60}
                  handleDiameter={28}
                  uncheckedIcon={<span style={{display: 'flex',fontSize: '20px', color:"aliceblue",  justifyContent: 'center'}}>☽</span>}
                  checkedIcon={<span style={{display: 'flex', fontSize: '20px', color:"aliceblue",  justifyContent: 'center'}}>✺</span>}
                  offColor="transparent"
                  onColor="#000"
    
                />
              </SwitchContainer>
            <Container>
              <ShowCase />
              <MySkills />
              
              <MyProjects />
              <Footer />
            </Container>
          </MainBody>
        </ThemeProvider>
      )}
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
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  margin-top: 10px;
  justify-content: center;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.colors.paranormal};
    background-color: ${({ theme }) => theme.colors.button_hover};
  }
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
  transition: all 0.3s ease-in;
  top: 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.stick};
`;

export const MainBody = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const Container = styled.div`
  width: 90%;
  max-width: 1280px;
  margin: auto;

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
    padding: 0 20px;
  }
`;
const SwitchContainer = styled.div`
   position: fixed;
  display: flex;
  margin: auto;
  align-items: center;
  justify-content: flex-end;
  background-color: ${({theme}) => theme.colors.button_hover};
  margin-top: 12px;
  margin-left: 8px;
  border-radius: 10px;
  padding: 10px;
  opacity: 0.3;
  transition: opacity 0.3s ease-in-out;
  z-index: 9999;
  cursor: move;
  left: 10;

  &:hover {
    opacity: 1;
  }
`;



export default App;
