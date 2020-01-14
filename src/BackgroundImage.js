import system from "system-components/emotion";
import { style } from "styled-system";

const bgImage = style({
  prop: "src",
  cssProperty: "backgroundImage",
  transformValue: n => `url(${n})`
});

export const BackgroundImage = system(
  {
    width: 1,
    ratio: 3 / 4,
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  bgImage,
  "ratio",
  "backgroundSize",
  "backgroundPosition",
  "space",
  "color"
);

BackgroundImage.displayName = "BackgroundImage";

export default BackgroundImage;
