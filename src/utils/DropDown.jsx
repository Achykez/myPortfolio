import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, yellowTheme } from "./themes";

const themeOptions = [  { name: "Light", theme: lightTheme },  { name: "Dark", theme: darkTheme },  { name: "Yellow", theme: yellowTheme },];


const Dropdown = () => {
 

  return (
    <ThemeProvider theme={selectedTheme}>
      <DropdownWrapper>
        <DropdownButton onClick={handleDropdownClick}>
          {selectedTheme === lightTheme && "Light"}
          {selectedTheme === darkTheme && "Dark"}
          {selectedTheme === yellowTheme && "Yellow"}
        </DropdownButton>
        <DropdownContent isOpen={isOpen}>
          {themeOptions.map((option) => (
            <DropdownItem
              key={option.name}
              onClick={() => handleThemeChange(option.theme)}
            >
              {option.name}
            </DropdownItem>
          ))}
        </DropdownContent>
      </DropdownWrapper>
    </ThemeProvider>
  );
};

export default Dropdown;
