import React from "react";
import { render } from "react-dom";
import Carousel from "./Carousel";
import images from "./images.json";
import { ThemeProvider } from "emotion-theming";

const App = () => (
  <ThemeProvider theme={{}}>
    <Carousel imageUrls={images} />
  </ThemeProvider>
);

render(<App />, document.getElementById("root"));
