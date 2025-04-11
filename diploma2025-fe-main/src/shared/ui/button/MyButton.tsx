import { Button as MUIButton, ButtonProps } from "@mui/material";
import { SxProps, Theme } from "@mui/system";
import React from "react";

interface MyButtonProps extends Omit<ButtonProps, "variant"> {
  buttonType?: "light" | "dark";
  sx?: SxProps<Theme>;
}

const MyButton: React.FC<MyButtonProps> = ({
  buttonType = "light",
  sx,
  children,
  ...props
}) => {
  const isDark = buttonType === "dark";
  const styles: SxProps<Theme> = {
    backgroundColor: isDark ? "black" : "white",
    color: isDark ? "white" : "black",
    borderRadius: "8px",
    border: "1px solid #e8e9ee",
    textDecoration: "none",
    "&:hover": {
      backgroundColor: isDark ? "#000" : "#f5f5f5",
      color: isDark ? "#fff" : "#333",
      opacity: 0.9,
      boxShadow: "0px 2px 4px rgba(0,0,0,0.2)",
    },
    ...sx,
  };

  return (
    <MUIButton {...props} sx={styles}>
      {children}
    </MUIButton>
  );
};

export default MyButton;
