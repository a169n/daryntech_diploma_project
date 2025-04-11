import { Box, Typography } from "@mui/material";
import { useState, useEffect, memo } from "react";
import { AnimatePresence } from "framer-motion";
import AnimatedForm from "@shared/ui/animatedForm/AnimatedForm";
import MyButton from "@shared/ui/button/MyButton";
import { ToastContainer, toast } from "react-toastify";
import useVerifyEmail from "../api/useVerifyEmail";
import { useNavigate } from "react-router-dom";
import SignUpForm from "./SignUpForm/SignUpForm";
import SignInForm from "./SignInForm/SignInForm";

const Auth = () => {
  const navigate = useNavigate();

  const [type, setType] = useState<"signIn" | "signUp">("signIn");
  const { isSuccess, error } = useVerifyEmail();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Email successfully verified!");
      navigate("/auth");
    }
    if (error) {
      toast.error(error.message || "Failed to verify email.");
    }
  }, [isSuccess, error]);

  const handleOnClick = (text: "signIn" | "signUp") => {
    if (text !== type) {
      setType(text);
    }
  };

  return (
    <Box
      sx={{
        textAlign: "center",
        mt: { xs: 2, sm: 5 },
        px: { xs: 2, sm: 0 },
      }}
    >
      <ToastContainer position="top-right" />
      <Typography variant="h2" gutterBottom>
        Welcome Back
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: { xs: 2, sm: 5 },
        }}
      >
        <AnimatePresence mode="wait">
          <AnimatedForm keyProp={type}>
            {type === "signUp" ? <SignUpForm /> : <SignInForm />}
          </AnimatedForm>
        </AnimatePresence>
      </Box>
      <MyButton
        buttonType="dark"
        onClick={() => handleOnClick(type === "signIn" ? "signUp" : "signIn")}
        sx={{ mt: 3, bgcolor: "#ff6812", "&:hover": { bgcolor: "#e54e00" } }}
      >
        {type === "signIn" ? "Go to Sign Up" : "Go to Sign In"}
      </MyButton>
    </Box>
  );
};

export default memo(Auth);
