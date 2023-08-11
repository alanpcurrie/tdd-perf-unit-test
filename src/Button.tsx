import React, { useState } from "react";
import type { ButtonProps } from "./types";

const styles = {
  button: {
    backgroundColor: "#003300",
    color: "#00FF00",
    padding: "10px 20px",
    margin: "10px",
    border: "2px solid #00FF00",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s"
  },
  hoveredButton: {
    backgroundColor: "#006600"
  }
};

export const Button: React.FC<ButtonProps> = ({
  children,
  style,
  ariaLabel,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState<Boolean>(false);

  return (
    <button
      {...props}
      aria-label={ariaLabel}
      style={{
        ...styles.button,
        ...style,
        ...(isHovered ? styles.hoveredButton : {})
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </button>
  );
};

export default Button;
