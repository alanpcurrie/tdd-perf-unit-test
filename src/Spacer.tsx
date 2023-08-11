import React from "react";
import { SpacerProps } from "./types";

export const Spacer: React.FC<SpacerProps> = ({
  as: Component = "div",
  direction,
  size
}) => {
  const style: React.CSSProperties = {
    display: "block",
    margin: 0,
    padding: 0,
    ...(direction === "horizontal"
      ? { width: size, height: 1 }
      : { height: size, width: 1 })
  };

  return <Component style={style} />;
};
