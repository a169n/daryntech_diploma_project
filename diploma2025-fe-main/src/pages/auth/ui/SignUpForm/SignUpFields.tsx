import React, { memo } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PasswordStrengthBar from "react-password-strength-bar";
import { SignUpFormFields } from "src/types/types";

interface SignUpFieldsProps {
  formData: SignUpFormFields;
  errors: Record<string, string | undefined>;
  showPassword: boolean;
  handleChange: (field: keyof SignUpFormFields, value: string) => void;
  togglePasswordVisibility: () => void;
}

export const SignUpFields: React.FC<SignUpFieldsProps> = ({
  formData,
  errors,
  showPassword,
  handleChange,
  togglePasswordVisibility,
}) => (
  <>
    <TextField
      label="Username"
      name="username"
      value={formData.username}
      onChange={(e) => handleChange("username", e.target.value)}
      error={!!errors.username}
      helperText={errors.username}
      fullWidth
      margin="normal"
    />
    <TextField
      label="First Name"
      name="firstName"
      value={formData.firstName}
      onChange={(e) => handleChange("firstName", e.target.value)}
      error={!!errors.firstName}
      helperText={errors.firstName}
      fullWidth
      margin="normal"
    />
    <TextField
      label="Last Name"
      name="lastName"
      value={formData.lastName}
      onChange={(e) => handleChange("lastName", e.target.value)}
      error={!!errors.lastName}
      helperText={errors.lastName}
      fullWidth
      margin="normal"
    />
    <TextField
      label="Email"
      name="email"
      value={formData.email}
      onChange={(e) => handleChange("email", e.target.value)}
      error={!!errors.email}
      helperText={errors.email}
      fullWidth
      margin="normal"
    />
    <TextField
      label="Password"
      name="password"
      type={showPassword ? "text" : "password"}
      value={formData.password}
      onChange={(e) => handleChange("password", e.target.value)}
      error={!!errors.password}
      helperText={errors.password}
      fullWidth
      margin="normal"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={togglePasswordVisibility}
              edge="end"
              size="small"
            >
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
    <TextField
      label="Confirm Password"
      name="confirmPassword"
      type={showPassword ? "text" : "password"}
      value={formData.confirmPassword}
      onChange={(e) => handleChange("confirmPassword", e.target.value)}
      error={!!errors.confirmPassword}
      helperText={errors.confirmPassword}
      fullWidth
      margin="normal"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={togglePasswordVisibility}
              edge="end"
              size="small"
            >
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
    <PasswordStrengthBar minLength={6} password={formData.password} />
  </>
);

export default memo(SignUpFields);
