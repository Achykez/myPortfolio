import React from "react";
import "./App.css";
import {
  About,
  Hero,
  Contact,
  Footer,
  ItBerries,
  Portfolio,
} from "./containers";

function App() {
  return (
    <div className="App">
      <Hero />
      <ItBerries />
      <About />
      <Portfolio />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
