import React, { useState, useEffect, useRef } from "react";
import styled, { ThemeProvider } from "styled-components";
import ShowCase from "./components/ShowCase";
import MySkills from "./components/MySkills";
import { MyProjects } from "./components/MyProjects";
import Footer from "./components/Footer";
import ReactSwitch from "react-switch";
import { GiHamburgerMenu } from "react-icons/gi";
import { ConfigProvider, Spin } from "antd";

import {
  FlexContainer,
  PaddingContainer,
  MainBody,
  NavBar,
  Logo, 
  Container,
  MenuIcon,
} from "./styles/Global.styled";
import NavMenu from "./components/layouts/NavMenu";
import {
  darkTheme,
  purpleTheme
 
} from "./utils/Theme";
import { Switcher } from "./components/Switcher";

function App() {
  const now = new Date();
  const currentHour = now.getHours();
  const isDaytime = currentHour >= 6 && currentHour < 18;

  const [isDarkMode, setIsDarkMode] = useState(isDaytime ? true : false);
  const [openMenu, setOpenMenu] = useState(false);
  const [loading, setLoading] = useState(true);

  const selectedTheme = {
    light: "#4E3A66",
    dark: "#7eadfc",
    bg_dark: "#161515",
    bg_light: "#211e1e",
  }

  useEffect(() => {
    // Simulate a delay to show the loader
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const savedMode = localStorage.getItem("isDarkMode");
    if (savedMode !== null) {
      setIsDarkMode(savedMode === "true");
    }
  }, []);
  
  const containerStyles = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: isDarkMode ? selectedTheme.bg_dark : selectedTheme.bg_light,
    color: isDarkMode ? selectedTheme.dark : selectedTheme.light,
  };

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("isDarkMode", newMode.toString());
  };
  return (
    <ConfigProvider
        theme={{
          token: {
            colorPrimary: isDarkMode ? selectedTheme.dark : selectedTheme.light,
          }
        }}
    
    >
      <ThemeProvider theme={isDarkMode ? darkTheme : purpleTheme}>
      {loading ? (
        <Spin size="large" tip="Loading..." style={containerStyles} color={isDarkMode ? selectedTheme.dark : selectedTheme.light} />

      ) : (
        <>
          <MainBody>
            <NavBar>
              <PaddingContainer
                top="1.2rem"
                bottom="1.2rem"
                responsiveLeft="1rem"
                responsiveRight="1rem">
                <Container>
                  <FlexContainer justify="space-between" responsiveFlex>
                    <Logo>
                      Engr-<NavText>Chyke</NavText>
                    </Logo>
                    <MenuIcon onClick={() => setOpenMenu(true)}>
                      <GiHamburgerMenu />
                    </MenuIcon>
                  </FlexContainer>
                </Container>
                {openMenu && <NavMenu setOpenMenu={setOpenMenu} />}
              </PaddingContainer>
            </NavBar>
         {
          openMenu === false ? 
          <SwitchContainer>
              <Switcher isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        </SwitchContainer> : null
         }          
          

            <Container>
              <ShowCase darkMode={isDarkMode} />
              <MySkills />
              <MyProjects />
              <Footer />
            </Container>
          </MainBody>
        </>
      )}
    </ThemeProvider>
    </ConfigProvider>
  );
}

export const NavText = styled.span`
  color: ${({ theme }) => theme.colors.nav};
`;
const SwitchContainer = styled.div`
  position: fixed;
  display: flex;
  margin: auto;
  align-items: center;
  justify-content: flex-end;
  background-color: ${({ theme }) => theme.colors.button_hover};
  margin-top: 12px;
  margin-left: 8px;
  border-radius: 10px;
  padding: 10px;
  opacity: 0.3;
  transition: opacity 0.3s ease-in-out;
  z-index: 9999;
  cursor: none;
  left: 10;  

  &:hover {
    opacity: 1;
  }
`;

export default App;
