import React, { useState, useEffect, useRef } from "react";
import styled, { ThemeProvider } from "styled-components";
import ShowCase from "./components/ShowCase";
import MySkills from "./components/MySkills";
import { MyProjects } from "./components/MyProjects";
import Loader from "./utils/Loader";
import Footer from "./components/Footer";
import ReactSwitch from "react-switch";
import { GiHamburgerMenu } from "react-icons/gi";
import { Spin } from 'antd';

import {
  BlueText,
  FlexContainer,
  PaddingContainer,
  MainBody,
  NavBar,
  LoaderWrapper,
  Logo,
  DropdownButton,
  DropdownContent,
  DropdownItem,
  DropdownWrapper,
  Container,
  MenuIcon
} from "./styles/Global.styled";
import NavMenu from "./components/layouts/NavMenu";
import { lightTheme, darkTheme, yellowTheme,greenTheme,themeOptions } from "./utils/Theme";
import { color } from "style-value-types";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [loading, setLoading] = useState(true);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(lightTheme);

  const handleDropdownClick = () => {
    setIsOpen(!isOpen);
  };

  const handleThemeChange = (theme) => {
    setSelectedTheme(theme);
    setIsOpen(false);
  };

  useEffect(() => {
    // Simulate a delay to show the loader
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

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

  const containerStyles = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#161515",
    color: selectedTheme.colors.secondary,
  };
  

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("isDarkMode", newMode.toString());
  };
  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : yellowTheme}>
      {loading ? (
        // <Loader />
        <Spin size="large" tip="Loading..." style={containerStyles} spinStyle={{color : isDarkMode ?  "#7eadfc" : "#555555" }} />
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


            {/* <DropdownWrapper>
              <DropdownButton onClick={handleDropdownClick}>
                {selectedTheme === lightTheme && "Light"}
                {selectedTheme === darkTheme && "Dark"}
                {selectedTheme === yellowTheme && "Yellow"}
              </DropdownButton>
              <DropdownContent isOpen={isOpen}>
                {themeOptions.map((option) => (
                  <DropdownItem
                    key={option.name}
                    onClick={() => handleThemeChange(option.theme)}>
                    {option.name}
                  </DropdownItem>
                ))}
              </DropdownContent>
            </DropdownWrapper> */}
           
            <Container>
              <ShowCase/>
              <MySkills />
              <MyProjects />
              <Footer />
            </Container>
          </MainBody>
        </>
      )}
    </ThemeProvider>
  );
};

export const NavText = styled.span`
  color: ${({ theme }) => theme.colors.nav};
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
