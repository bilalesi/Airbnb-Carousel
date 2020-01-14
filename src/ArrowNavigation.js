//@flow

import React from "react";
import styled, { css } from "react-emotion";
import {
  justifyContent,
  alignItems,
  color,
  top,
  right,
  bottom,
  left,
  position,
  display,
  width,
  maxWidth
} from "styled-system";
import NavigateNext from "emotion-icons/material/NavigateNext";
import NavigateBefore from "emotion-icons/material/NavigateBefore";

const NavigationButton = styled("div")`
  ${justifyContent};
  ${alignItems};
  ${color};
  ${top};
  ${right};
  ${bottom};
  ${left};
  ${position};
  ${display};
  ${width};
  ${maxWidth};
  cursor: pointer;
`;

const Pagination = ({
  onChangeIndex,
  index,
  slideCount,
  onMouseLeave,
  onMouseEnter,
  onTouchStart,
  onTouchEnd
}) => {
  return [
    <NavigationButton
      key="next-nav"
      display="flex"
      position="absolute"
      alignItems="center"
      justifyContent="center"
      bottom="0px"
      top="0px"
      right="0px"
      width={[1 / 4]}
      maxWidth="100px"
      onClick={() =>
        slideCount - 1 > index ? onChangeIndex(index + 1) : onChangeIndex(0)
      }
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className={css`
        background: rgb(255, 255, 255);
        background: linear-gradient(
          90deg,
          rgba(255, 255, 255, 0) 0%,
          rgba(0, 0, 0, 0.5) 100%
        );
      `}
    >
      <NavigateNext size={24} color="white" />
    </NavigationButton>,
    <NavigationButton
      key="before-nav"
      display="flex"
      position="absolute"
      alignItems="center"
      justifyContent="center"
      bottom="0px"
      top="0px"
      left="0px"
      width={[1 / 4]}
      maxWidth="100px"
      onClick={() =>
        index > 0 ? onChangeIndex(index - 1) : onChangeIndex(slideCount - 1)
      }
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className={css`
        background: rgb(2, 0, 36);
        background: linear-gradient(
          90deg,
          rgba(0, 0, 0, 0.5) 0%,
          rgba(255, 255, 255, 0) 100%
        );
      `}
    >
      <NavigateBefore size={24} color="white" />
    </NavigationButton>
  ];
};

export default Pagination;
