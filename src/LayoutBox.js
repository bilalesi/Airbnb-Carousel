/* eslint-disable jsx-a11y/anchor-is-valid */
import { Box } from "grid-styled/emotion";
import system from "system-components/emotion";

const LayoutBox = system(
  { is: Box, width: 1 },
  ({ overflow }) => ({
    overflow
  }),
  "color",
  "maxWidth",
  "minWidth",
  "borderRadius",
  "space",
  "position",
  "zIndex"
);

LayoutBox.displayName = "LayoutBox";

export default LayoutBox;
