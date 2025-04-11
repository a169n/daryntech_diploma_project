import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ff6812",
      light: "#ff8a45",
      dark: "#e54e00",
    },
  },
  typography: {
    fontFamily: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
    fontSize: 14,
    h1: {
      fontSize: "2rem",
      fontWeight: 600,
      color: "black",
    },
    h2: {
      fontSize: "1.5rem",
      fontWeight: 600,
      color: "black",
    },
    h4: {
      fontSize: "1.2rem",
      fontWeight: 500,
      marginBottom: "1rem",
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        size: "small",
      },
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "&:hover fieldset": {
              borderColor: "#ff6812",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#ff6812",
            },
            // Handle autofill styles
            "& input": {
              "&:-webkit-autofill": {
                "-webkit-box-shadow": "0 0 0 100px white inset",
                "-webkit-text-fill-color": "black",
                "caret-color": "black",
              },
              "&:-webkit-autofill:hover": {
                "-webkit-box-shadow": "0 0 0 100px white inset",
                "-webkit-text-fill-color": "black",
                "caret-color": "black",
              },
              "&:-webkit-autofill:focus": {
                "-webkit-box-shadow": "0 0 0 100px white inset",
                "-webkit-text-fill-color": "black",
                "caret-color": "black",
              },
              "&:-webkit-autofill:active": {
                "-webkit-box-shadow": "0 0 0 100px white inset",
                "-webkit-text-fill-color": "black",
                "caret-color": "black",
              },
            },
          },
        },
      },
    },
    MuiTypography: {
      defaultProps: {
        variant: "body1",
      },
      styleOverrides: {
        root: {
          color: "black",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          "&.Mui-disabled": {
            backgroundColor: "#e0e0e0",
            color: "#9e9e9e",
            border: "1px solid #d6d6d6",
            cursor: "not-allowed",
            boxShadow: "none",
          },
        },
      },
    },
  },
});

export default theme;
