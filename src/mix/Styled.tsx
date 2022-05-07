import React from "react";
import styled from "styled-components";
import {
  color,
  space,
  layout,
  position,
  border,
  flexbox,
  flex,
  background,
  typography,
  SpaceProps,
  ColorProps,
  LayoutProps,
  FlexboxProps,
  PositionProps,
  BorderProps,
  FlexProps,
  BackgroundProps,
  TypographyProps,
} from "styled-system";

export interface BoxProps
  extends SpaceProps,
    ColorProps,
    LayoutProps,
    FlexboxProps,
    PositionProps,
    BorderProps,
    FlexProps,
    BackgroundProps,
    TypographyProps {}

const _Box = styled.div<BoxProps>`
  ${color}
  ${space}
  ${layout}
  ${position}
  ${border}
  ${flexbox}
  ${flex}
  ${background}
  ${typography}
`;
export const Box = React.memo(_Box);
