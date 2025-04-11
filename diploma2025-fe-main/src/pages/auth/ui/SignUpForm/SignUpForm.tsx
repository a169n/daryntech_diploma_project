import React, { memo, useState } from "react";
import { Box, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import MyButton from "@shared/ui/button/MyButton";
import SignUpFields from "./SignUpFields";
import { SignUpFormFields } from "src/types/types";
import useSignup from "@pages/auth/api/useSignUp";

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<SignUpFormFields>({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const signUpMutate = useSignup();

  const handleChange = (field: keyof SignUpFormFields, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      signUpMutate.mutate(formData, {
        onSuccess: (data) => {
          toast.success(data.message);
          setFormData({
            username: "",
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
        },
        onError: (error) => {
          const errorMessage =
            (error as any)?.message || "An error occurred during signup";
          toast.error(errorMessage);
        },
      });
    }
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
        Create your account
      </Typography>
      <SignUpFields
        formData={formData}
        errors={errors}
        showPassword={showPassword}
        handleChange={handleChange}
        togglePasswordVisibility={togglePasswordVisibility}
      />
      <MyButton
        type="submit"
        fullWidth
        sx={{ mt: 3 }}
        buttonType="dark"
        disabled={signUpMutate.isPending}
      >
        {signUpMutate.isPending ? "Creating Account..." : "Create Account"}
      </MyButton>
    </Box>
  );
};

export default memo(SignUpForm);
