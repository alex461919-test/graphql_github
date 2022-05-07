import React from "react";
import styled from "@emotion/styled";
import shouldForwardProp from "@styled-system/should-forward-prop";
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

export const styledTheme = {
  space: Array(512)
    .fill(null)
    .map((value, index) => index),
};

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

const _Box_ = styled("div", process.env.NODE_ENV === "production" ? { shouldForwardProp } : {})<BoxProps>`
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

export const Box = React.memo(_Box_);
