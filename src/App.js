import React from "react";
import { ThemeProvider } from "styled-components";
import { MainBody, Container } from "./styles/Global.styled";
import { theme } from "./utils/Theme";

// components
import ShowCase from "./components/ShowCase";


function App() {
  return (
    <ThemeProvider theme={theme}>
      <MainBody>
        <Container>
        <ShowCase></ShowCase>

        </Container>
      </MainBody>
    </ThemeProvider>
  );
}

export default App;
