import React, { memo, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import useLogin from "@pages/auth/api/useLogin";
import { SignInFormFields } from "src/types/types";
import SignInFields from "./SignInFields";
import MyButton from "@shared/ui/button/MyButton";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import GoogleIcon from "@mui/icons-material/Google";
import useGoogleLogin from "@pages/auth/api/useGoogle";
import { useNavigate } from "react-router-dom";

const SignInForm = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<SignInFormFields>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const loginMutation = useLogin();
  const { mutate: googleLogin } = useGoogleLogin();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === "email") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: value
          ? value.includes("@")
            ? ""
            : "Invalid email address"
          : "Email is required",
      }));
    }
  };

  const handleGoogleLogin = () => {
    googleLogin();
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!state.email || !state.password) {
      setErrors({
        email: !state.email ? "Email is required" : errors.email,
        password: !state.password ? "Password is required" : errors.password,
      });
      toast.error("Please fill all required fields", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    loginMutation.mutate(
      { email: state.email, password: state.password },
      {
        onSuccess: (data) => {
          const successMessage = data.message;
          toast.success(successMessage || "Login Successfull!", {
            position: "top-right",
            autoClose: 3000,
          });
          setTimeout(() => {
            navigate("/");
          }, 2000);
        },
        onError: (error) => {
          const axiosError = error as any;
          const errorMessage =
            axiosError.response?.data?.message ||
            "Login failed. Please check your credentials.";

          toast.error(errorMessage, {
            position: "top-right",
            autoClose: 3000,
          });
          console.error("Login error:", axiosError);
        },
      }
    );
  };

  return (
    <Box
      component={motion.form}
      onSubmit={handleSubmit}
      sx={{
        width: "100%",
        maxWidth: { xs: "100%", sm: 500 },
        p: { xs: 2, sm: 3 },
        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
        borderRadius: 2,
        bgcolor: "white",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Sign In to Your Account
      </Typography>

      <SignInFields
        email={state.email}
        password={state.password}
        errors={errors}
        onChange={handleChange}
      />
      <MyButton
        type="submit"
        fullWidth
        sx={{ mt: 3 }}
        buttonType="dark"
        disabled={loginMutation.isPending || loginMutation.isSuccess}
      >
        {loginMutation.isSuccess ? (
          <CircularProgress color="inherit" size={18} />
        ) : (
          "Sign In"
        )}
      </MyButton>
      <MyButton
        startIcon={<GoogleIcon />}
        onClick={() => {
          handleGoogleLogin();
        }}
        sx={{
          mt: 2,
          px: 2,
          border: "1px solid #000",
          "&:hover": {
            bgcolor: "#000",
            color: "#fff",
            transition: "all 0.2s ease-in-out",
          },
          textTransform: "none",
          transition: "all 0.2s ease-in-out",
        }}
      >
        Sign in with Google
      </MyButton>
    </Box>
  );
};

export default memo(SignInForm);
