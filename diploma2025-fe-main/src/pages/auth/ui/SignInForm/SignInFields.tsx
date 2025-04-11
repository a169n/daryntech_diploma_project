import { TextField, InputAdornment, IconButton } from "@mui/material";
import { memo, useState } from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

interface SignInFieldsProps {
  email: string;
  password: string;
  errors: {
    email?: string;
    password?: string;
  };
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SignInFields = ({
  email,
  password,
  errors,
  onChange,
}: SignInFieldsProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      <TextField
        label="Email"
        name="email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={email}
        onChange={onChange}
        error={!!errors.email}
        helperText={errors.email}
      />
      <TextField
        label="Password"
        name="password"
        type={showPassword ? "text" : "password"}
        variant="outlined"
        fullWidth
        margin="normal"
        value={password}
        onChange={onChange}
        error={!!errors.password}
        helperText={errors.password}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleTogglePassword}
                edge="end"
                size="small"
              >
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </>
  );
};

export default memo(SignInFields);
